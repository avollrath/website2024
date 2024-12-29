// import fetch from 'node-fetch';

// let currentAccessToken = import.meta.env.SPOTIFY_ACCESS_TOKEN;

// // Function to refresh the access token
// async function refreshAccessToken(refreshToken) {
//   const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
//   const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
//   console.log('Client ID:', clientId);
// console.log('Client Secret:', clientSecret);
//   const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Basic ${basicAuth}`,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       'grant_type': 'refresh_token',
//       'refresh_token': refreshToken
//     })
//   });

//   console.log("Attempting to refresh access token");
//   const data = await response.json();
//   console.log("Refresh token response:", data);

//   // Update the module-level access token with the new value
//   currentAccessToken = data.access_token;
//   return data.access_token;
// }

// // Main function to get top tracks from Spotify
// async function getTopTracks(refreshToken) {
//   let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
//     headers: {
//       Authorization: `Bearer ${currentAccessToken}`
//     }
//   });

//   // Check if the access token was expired
//   if (response.status === 401) {
//     // Refresh the token
//     await refreshAccessToken(refreshToken);
//     // Retry the request with the new token
//     response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
//       headers: {
//         Authorization: `Bearer ${currentAccessToken}`
//       }
//     });
//   }

//   if (!response.ok) {
//     throw new Error(`Error fetching top tracks: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.items;
// }

// async function getCurrentPlayingTrack(refreshToken) {
//   if (!currentAccessToken) {
//     await refreshAccessToken(refreshToken);
//   }

//   let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
//     headers: {
//       Authorization: `Bearer ${currentAccessToken}`
//     }
//   });

//   if (response.status === 401) {
//     await refreshAccessToken(refreshToken);
//     response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
//       headers: {
//         Authorization: `Bearer ${currentAccessToken}`
//       }
//     });
//   }

//   // Check if the response is ok and not empty
//   if (response.ok && response.status !== 204) {
//     const data = await response.json();
//     console.log("Currently Playing Track:", data); // Log the response
//     return data;
//   } else {
//     // Handle no content or other errors
//     console.log("No currently playing track or error:", response.status);
//     return null;
//   } 
// }

// async function getTopTracksAllTime(refreshToken) {
//   // Ensure the access token is current
//   if (!currentAccessToken) {
//     await refreshAccessToken(refreshToken);
//   }

//   let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
//     headers: {
//       Authorization: `Bearer ${currentAccessToken}`
//     }
//   });

//   // Check if the access token was expired
//   if (response.status === 401) {
//     // Refresh the token
//     await refreshAccessToken(refreshToken);
//     // Retry the request with the new token
//     response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
//       headers: {
//         Authorization: `Bearer ${currentAccessToken}`
//       }
//     });
//   }

//   if (!response.ok) {
//     throw new Error(`Error fetching all-time top tracks: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.items;
// }

// export { getTopTracks, getTopTracksAllTime, getCurrentPlayingTrack };


import fetch from 'node-fetch';

let currentAccessToken = import.meta.env.SPOTIFY_ACCESS_TOKEN;

// Function to fetch top tracks
async function getTopTracks() {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error fetching top tracks:', error);
    throw new Error(`Failed to fetch top tracks: ${error.error.message}`);
  }

  const data = await response.json();
  console.log('Your Top Tracks:', data.items);
  return data.items;
}

// Function to fetch currently playing track
async function getCurrentPlayingTrack() {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 204) {
      console.log('No track is currently playing.');
      return null;
    }

    const error = await response.json();
    console.error('Error fetching currently playing track:', error);
    throw new Error(`Failed to fetch currently playing track: ${error.error.message}`);
  }

  const data = await response.json();
  console.log('Currently Playing Track:', data);
  return data;
}

// Function to fetch all-time top tracks
async function getTopTracksAllTime() {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
    headers: {
      Authorization: `Bearer ${currentAccessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error fetching all-time top tracks:', error);
    throw new Error(`Failed to fetch all-time top tracks: ${error.error.message}`);
  }

  const data = await response.json();
  console.log('Your All-Time Top Tracks:', data.items);
  return data.items;
}

// Export the functions to maintain functionality
export { getTopTracks, getTopTracksAllTime, getCurrentPlayingTrack };
