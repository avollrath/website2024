import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };
  

  export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  const CACHE_PATH = path.join('src', 'lib', 'spotifyCache.json');

  export async function writeSpotifyCache(tracks) {
    const fileName = 'spotifyCache.json';
    fs.writeFileSync(CACHE_PATH, JSON.stringify(tracks, null, 2), 'utf-8');
  }
  
  // Reading (same file, no path)
  export async function readSpotifyCache() {
    if (!fs.existsSync(CACHE_PATH)) return null;

  try {
    const data = fs.readFileSync(CACHE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading spotifyCache.json:', error);
    return null;
  }
}