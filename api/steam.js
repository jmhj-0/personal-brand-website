export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { steamid } = req.query;

  if (!steamid) {
    return res.status(400).json({ error: 'Steam ID is required' });
  }

  const apiKey = process.env.STEAM_API_KEY || '5555D413C1416D77C8D56E9AFED7B6DA';

  if (!apiKey) {
    return res.status(500).json({ error: 'Steam API key not configured' });
  }

  let resolvedSteamId = steamid;

  // If steamid is not numeric, assume it's a vanity URL and resolve it
  if (!/^\d+$/.test(steamid)) {
    try {
      const resolveResponse = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${steamid}`);
      const resolveData = await resolveResponse.json();
      if (resolveData.response.success === 1) {
        resolvedSteamId = resolveData.response.steamid;
      } else {
        throw new Error('Invalid vanity URL');
      }
    } catch (error) {
      console.error('Steam resolve error:', error);
      return res.status(400).json({ error: 'Failed to resolve Steam ID' });
    }
  }

  try {
    const response = await fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${resolvedSteamId}&format=json`);

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();

    const games = data.response.games || [];

    // Format the games
    const recentGames = games.map(game => ({
      name: game.name,
      playtime_2weeks: game.playtime_2weeks,
      playtime_forever: game.playtime_forever,
      img_icon_url: game.img_icon_url ? `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : null,
      appid: game.appid,
    }));

    res.status(200).json({
      steamid: resolvedSteamId,
      games: recentGames,
    });
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Failed to fetch Steam games' });
  }
}