import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600'); // Cache for 10 minutes

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const rssUrl = `https://www.goodreads.com/review/list_rss/${user_id}?shelf=read`;
    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error(`Goodreads RSS error: ${response.status}`);
    }

    const xml = await response.text();
    const result = await parseStringPromise(xml);

    const items = result.rss.channel[0].item || [];

    // Take top 6 recent reviews
    const reviews = items.slice(0, 6).map(item => ({
      title: item.title[0],
      author: item.author_name ? item.author_name[0] : 'Unknown',
      rating: item.user_rating ? item.user_rating[0] : null,
      review_date: item.user_date_added ? item.user_date_added[0] : null,
      book_url: item.link[0],
      book_image: item.book_large_image_url ? item.book_large_image_url[0] : null,
    }));

    res.status(200).json({
      user_id,
      reviews,
    });
  } catch (error) {
    console.error('Goodreads RSS error:', error);
    res.status(500).json({ error: 'Failed to fetch Goodreads reviews' });
  }
}