import React, { useState } from 'react';
import Header from './Header';
import emailjs from '@emailjs/browser';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Replace with your EmailJS service ID, template ID, and public key
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      const templateParams = {
        from_name: formData.name || 'Anonymous',
        from_email: formData.email,
        subject: formData.subject || 'No Subject',
        message: formData.message,
        to_email: 'joseph@jmhj.io'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="bg-effects">
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
      </div>
      <Header />
      <main>
        <h2>Contact Me</h2>
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name (Optional)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject (Optional)</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="6"
                required
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default ContactPage;