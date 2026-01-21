import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const emailData = {
      from: 'Contact Form <noreply@resend.dev>', // Use Resend's verified sender
      reply_to: email, // Allow replies to go to the contact form submitter
      to: 'joseph@jmhj.io',
      subject: subject ? `Contact Form: ${subject}` : 'Contact Form Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <h3>Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0; white-space: pre-wrap;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Message

From: ${name || 'Anonymous'} (${email})
${subject ? `Subject: ${subject}` : ''}

Message:
${message}

---
This message was sent from your website contact form.
      `
    };

    const result = await resend.emails.send(emailData);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}