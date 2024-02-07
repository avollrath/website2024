import fetch from 'node-fetch';

let currentAccessToken = import.meta.env.SPOTIFY_ACCESS_TOKEN;

// Function to refresh the access token
async function refreshAccessToken(refreshToken) {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken
    })
  });

  console.log("Attempting to refresh access token");
  const data = await response.json();
  console.log("Refresh token response:", data);

  // Update the module-level access token with the new value
  currentAccessToken = data.access_token;
  return data.access_token;
}

// Main function to get top tracks from Spotify
async function getTopTracks(refreshToken) {
  let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`
    }
  });

  // Check if the access token was expired
  if (response.status === 401) {
    // Refresh the token
    await refreshAccessToken(refreshToken);
    // Retry the request with the new token
    response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
      headers: {
        Authorization: `Bearer ${currentAccessToken}`
      }
    });
  }

  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export default getTopTracks;
