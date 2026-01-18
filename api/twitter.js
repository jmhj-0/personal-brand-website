export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300'); // Cache for 5 minutes (tweets update faster)

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAAKDS6wEAAAAALu83jBlD1RjM5o45F9Vp2QwOO3o=Y67H6LkU48axRe3WYfUTqlQkSiOMgHaSuCxhXlSeKx7l1ogpBt';

  if (!bearerToken) {
    return res.status(500).json({ error: 'Twitter API key not configured' });
  }

  try {
    // First, get user ID from username
    const userResponse = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error(`Twitter API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const userId = userData.data.id;

    // Then, get recent tweets
    const tweetsResponse = await fetch(`https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,text`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    });

    if (!tweetsResponse.ok) {
      throw new Error(`Twitter API error: ${tweetsResponse.status}`);
    }

    const tweetsData = await tweetsResponse.json();

    res.status(200).json({
      username,
      user: userData.data,
      tweets: tweetsData.data || [],
    });
  } catch (error) {
    console.error('Twitter API error:', error);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
}