export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const clientId = '3827b04b7a6529bacdb7412464524ff6';

  try {
    const response = await fetch(`https://api.myanimelist.net/v2/users/${username}/mangalist?limit=6&sort=list_updated_at&fields=list_status,num_volumes,media_type,start_date,end_date,url`, {
      headers: {
        'X-MAL-CLIENT-ID': clientId,
      },
    });

    if (!response.ok) {
      throw new Error(`MAL API error: ${response.status}`);
    }

    const data = await response.json();

    const manga = data.data.map(item => ({
      title: item.node.title,
      status: item.list_status.status,
      score: item.list_status.score,
      updated_at: item.list_status.updated_at,
      image_url: item.node.main_picture.medium,
      url: `https://myanimelist.net/manga/${item.node.id}`,
      media_type: item.node.media_type,
      num_volumes: item.node.num_volumes,
    })).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    res.status(200).json({
      username,
      manga,
    });
  } catch (error) {
    console.error('MAL API error:', error);
    res.status(500).json({ error: 'Failed to fetch manga list' });
  }
}