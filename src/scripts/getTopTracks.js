import fetch from 'node-fetch';
import { readSpotifyCache, writeSpotifyCache } from './utils.js';

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

async function getTopTracks(refreshToken) {
  try {
    let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10', {
      headers: {
        Authorization: `Bearer ${currentAccessToken}`
      }
    });

    // If 401, attempt token refresh, then retry
    if (response.status === 401) {
      await refreshAccessToken(refreshToken);
      response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10', {
        headers: { Authorization: `Bearer ${currentAccessToken}` }
      });
    }

    if (!response.ok) {
      // If not OK, we throw so we jump to catch block
      throw new Error(`Spotify API error: ${response.status}`);
    }

    // Succeeded, parse JSON
    const data = await response.json();

    // Cache the results for fallback
    await writeSpotifyCache(data.items);

    return data.items;
  } catch (err) {
    console.error('Error fetching top tracks:', err);

    // If the fetch fails (network error or 5xx, etc.),
    // fallback to reading the cache:
    const cachedData = await readSpotifyCache();
    if (cachedData) {
      console.log('Returning cached Spotify tracks.');
      return cachedData;
    } else {
      // If we have no cache, return empty array or handle gracefully
      console.log('No cache available, returning empty array.');
      return [];
    }
  }
}

async function getCurrentPlayingTrack(refreshToken) {
  if (!currentAccessToken) {
    await refreshAccessToken(refreshToken);
  }

  let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`
    }
  });

  if (response.status === 401) {
    await refreshAccessToken(refreshToken);
    response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${currentAccessToken}`
      }
    });
  }

  // Check if the response is ok and not empty
  if (response.ok && response.status !== 204) {
    const data = await response.json();
    console.log("Currently Playing Track:", data); // Log the response
    return data;
  } else {
    // Handle no content or other errors
    console.log("No currently playing track or error:", response.status);
    return null;
  } 
}

async function getTopTracksAllTime(refreshToken) {
  // Ensure the access token is current
  if (!currentAccessToken) {
    await refreshAccessToken(refreshToken);
  }

  let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`
    }
  });

  // Check if the access token was expired
  if (response.status === 401) {
    // Refresh the token
    await refreshAccessToken(refreshToken);
    // Retry the request with the new token
    response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
      headers: {
        Authorization: `Bearer ${currentAccessToken}`
      }
    });
  }

  if (!response.ok) {
    throw new Error(`Error fetching all-time top tracks: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export { getTopTracks, getTopTracksAllTime, getCurrentPlayingTrack };
