export default async function handler(req, res) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);

  console.log(JSON.stringify({
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    service: 'steam-api'
  }));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600'); // Cache for 10 minutes

  if (req.method === 'OPTIONS') {
    console.log(JSON.stringify({
      requestId,
      timestamp: new Date().toISOString(),
      status: 200,
      duration: Date.now() - startTime,
      service: 'steam-api',
      message: 'OPTIONS request handled'
    }));
    res.status(200).end();
    return;
  }

  const { steamid } = req.query;

  if (!steamid) {
    return res.status(400).json({
      error: 'Steam ID is required',
      message: 'Please provide a valid Steam ID or vanity URL.',
      code: 'MISSING_STEAM_ID'
    });
  }

  // Validate and sanitize steamid
  const sanitizedSteamId = String(steamid).trim();
  if (sanitizedSteamId.length === 0 || sanitizedSteamId.length > 100) {
    return res.status(400).json({
      error: 'Invalid Steam ID format',
      message: 'Steam ID must be between 1 and 100 characters.',
      code: 'INVALID_STEAM_ID_LENGTH'
    });
  }

  // Allow alphanumeric, underscores, and hyphens for vanity URLs, or pure numeric for Steam IDs
  const steamIdRegex = /^[a-zA-Z0-9_-]+$/;
  if (!steamIdRegex.test(sanitizedSteamId)) {
    return res.status(400).json({
      error: 'Invalid Steam ID format',
      message: 'Steam ID can only contain letters, numbers, underscores, and hyphens.',
      code: 'INVALID_STEAM_ID_CHARACTERS'
    });
  }

  const apiKey = process.env.STEAM_API_KEY || '5555D413C1416D77C8D56E9AFED7B6DA';

  if (!apiKey) {
    return res.status(500).json({
      error: 'Steam API key not configured',
      message: 'The server is not properly configured. Please try again later.',
      code: 'API_KEY_MISSING'
    });
  }

  let resolvedSteamId = sanitizedSteamId;

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
      return res.status(400).json({
        error: 'Failed to resolve Steam ID',
        message: 'The provided Steam ID or vanity URL is invalid. Please check and try again.',
        code: 'INVALID_STEAM_ID'
      });
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

    const result = {
      steamid: resolvedSteamId,
      games: recentGames,
    };

    console.log(JSON.stringify({
      requestId,
      timestamp: new Date().toISOString(),
      status: 200,
      duration: Date.now() - startTime,
      service: 'steam-api',
      gamesCount: recentGames.length
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Steam API error:', error);

    let statusCode = 500;
    let errorMessage = 'Failed to fetch Steam games';
    let userMessage = 'Unable to load Steam gaming data. Please try again later.';
    let errorCode = 'STEAM_API_ERROR';

    if (error.message.includes('Steam API error: 401')) {
      statusCode = 503;
      userMessage = 'Steam service is temporarily unavailable. Please check back later.';
      errorCode = 'STEAM_SERVICE_UNAVAILABLE';
    } else if (error.message.includes('Steam API error: 403')) {
      statusCode = 403;
      userMessage = 'Access to Steam data is restricted. The profile might be private.';
      errorCode = 'STEAM_ACCESS_DENIED';
    } else if (error.message.includes('Steam API error: 429')) {
      statusCode = 429;
      userMessage = 'Too many requests to Steam. Please wait a moment and try again.';
      errorCode = 'STEAM_RATE_LIMITED';
    }

    console.log(JSON.stringify({
      requestId,
      timestamp: new Date().toISOString(),
      status: statusCode,
      duration: Date.now() - startTime,
      service: 'steam-api',
      error: errorCode,
      errorMessage
    }));

    res.status(statusCode).json({
      error: errorMessage,
      message: userMessage,
      code: errorCode
    });
  }
}