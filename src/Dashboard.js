import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import './Dashboard.css'

const spotifyApi = new SpotifyWebApi({
  clientId: "9b210a400aa5497a94ef800a2d466e69",
})

// Hardcoded playlist URLs
export const spotify_playlist_urls = [
  "https://open.spotify.com/playlist/1m7Ov4UeE0XYD2P82Qnt8B?si=c7d2d7110afb436e",
  "https://open.spotify.com/playlist/37i9dQZEVXbMxjQJh4Um8T?si=fd527aa3412840fa",
  "https://open.spotify.com/playlist/37i9dQZEVXbMMy2roB9myp?si=ea0eefc1ca634b09",
  "https://open.spotify.com/playlist/37i9dQZEVXbJPcfkRz0wJ0?si=a0546b22d64f4ea9",
  "https://open.spotify.com/playlist/37i9dQZEVXbKNHh6NIXu36?si=03132339c8f6499d",
  "https://open.spotify.com/playlist/37i9dQZEVXbJNSeeHswcKB?si=e726257f64064d8b",
  "https://open.spotify.com/playlist/37i9dQZEVXbJqfMFK4d691?si=ead21f0201c14a98",
  "https://open.spotify.com/playlist/37i9dQZEVXbMXbN3EUUhlg?si=38ba29ae71cc4db0",
  "https://open.spotify.com/playlist/37i9dQZEVXbNfM2w2mq1B8?si=77def92583a04063",
  "https://open.spotify.com/playlist/37i9dQZEVXbKj23U1GF4IR?si=91f1f258f46b4c5f",
  "https://open.spotify.com/playlist/37i9dQZEVXbL0GavIqMTeb?si=eeedb565ca624951",
  "https://open.spotify.com/playlist/37i9dQZEVXbOa2lmxNORXQ?si=d304a248bd9e4223",
  "https://open.spotify.com/playlist/37i9dQZEVXbMZAjGMynsQX?si=a7cd0e4f98f2494d",
  "https://open.spotify.com/playlist/37i9dQZEVXbIP3c3fqVrJY?si=89de111778fc4875",
  "https://open.spotify.com/playlist/37i9dQZEVXbL3J0k32lWnN?si=b09e2a3aa8544329",
  "https://open.spotify.com/playlist/37i9dQZEVXbKAbrMR8uuf7?si=bcfff24fe7264032",
  "https://open.spotify.com/playlist/37i9dQZEVXbJlM6nvL1nD1?si=d4e4240a3ecd4ac7",
  "https://open.spotify.com/playlist/37i9dQZEVXbLn7RQmT5Xv2?si=f71b1df31bd14ff2",
  "https://open.spotify.com/playlist/37i9dQZEVXbLxoIml4MYkT?si=d85d968d448e4afb",
  "https://open.spotify.com/playlist/37i9dQZEVXbLesry2Qw2xS?si=bdefe988beea4b1f",
  "https://open.spotify.com/playlist/37i9dQZEVXbJiZcmkrIHGU?si=c526bb84d94b47c0",
  "https://open.spotify.com/playlist/37i9dQZEVXbMxcczTSoGwZ?si=54eb7769709e4fab",
  "https://open.spotify.com/playlist/37i9dQZEVXbIPWwFssbupI?si=a562dd859c1b45b1",
  "https://open.spotify.com/playlist/37i9dQZEVXbJqdarpmTJDL?si=783f127f7fec4cbf",
  "https://open.spotify.com/playlist/37i9dQZEVXbLy5tBFyQvd4?si=33d70abf18a24d59",
  "https://open.spotify.com/playlist/37i9dQZEVXbJp9wcIM9Eo5?si=0d52686792454fa9",
  "https://open.spotify.com/playlist/37i9dQZEVXbNHwMxAkvmF8?si=7e5d73c72ef04efa",
  "https://open.spotify.com/playlist/37i9dQZEVXbKMzVsSGQ49S?si=7abdb984ddb54f74",
  "https://open.spotify.com/playlist/37i9dQZEVXbLZ52XmnySJg?si=4385d0349bc948a0",
  "https://open.spotify.com/playlist/37i9dQZEVXbObFQZ3JLcXt?si=e4af6b3362874813",
  "https://open.spotify.com/playlist/37i9dQZEVXbM4UZuIrvHvA?si=3f32228440424749",
  "https://open.spotify.com/playlist/37i9dQZEVXbKM896FDX8L1?si=b4fd4b3b53f844aa",
  "https://open.spotify.com/playlist/37i9dQZEVXbJ6IpvItkve3?si=aacbeedc3101443c",
  "https://open.spotify.com/playlist/37i9dQZEVXbIQnj7RRhdSX?si=4b5415fbe4f54004",
  "https://open.spotify.com/playlist/37i9dQZEVXbKXQ4mDTEBXq?si=80c7401fd5ae45fa",
  "https://open.spotify.com/playlist/37i9dQZEVXbNxXF4SkHj9F?si=09ea94992f3349f2",
  "https://open.spotify.com/playlist/37i9dQZEVXbJWuzDrTxbKS?si=98e9157ece814254",
  "https://open.spotify.com/playlist/37i9dQZEVXbMx56Rdq5lwc?si=c1339bee0bca4f4d",
  "https://open.spotify.com/playlist/37i9dQZEVXbJ9SRaVj0yDF?si=42b1fb75ba7f430b",
  "https://open.spotify.com/playlist/37i9dQZEVXbJlfUljuZExa?si=9a69338ba2784534",
  "https://open.spotify.com/playlist/37i9dQZEVXbO3qyFxbkOE1?si=2748542560f8470e",
  "https://open.spotify.com/playlist/37i9dQZEVXbJU9eQpX8gPT?si=f735b47a21b44641",
  "https://open.spotify.com/playlist/37i9dQZEVXbKCF6dqVpDkS?si=5b64f6208f734379",
  "https://open.spotify.com/playlist/37i9dQZEVXbM8SIrkERIYl?si=150b04c94a734197",
  "https://open.spotify.com/playlist/37i9dQZEVXbJvfa0Yxg7E7?si=7db07ef2c4844793",
  "https://open.spotify.com/playlist/37i9dQZEVXbKypXHVwk1f0?si=fcf3af8303d44c96",
  "https://open.spotify.com/playlist/37i9dQZEVXbNOUPGj7tW6T?si=fad5be826eb34817",
  "https://open.spotify.com/playlist/37i9dQZEVXbJfdy5b0KP7W?si=5799cba2eb67489c",
  "https://open.spotify.com/playlist/37i9dQZEVXbNBz9cRCSFkY?si=e37536b314b946e1",
  "https://open.spotify.com/playlist/37i9dQZEVXbN6itCcaL3Tt?si=eae3ef300ff84475",
  "https://open.spotify.com/playlist/37i9dQZEVXbKyJS56d1pgi?si=f4ac6d5385074c63",
  "https://open.spotify.com/playlist/37i9dQZEVXbNZbJ6TZelCq?si=da13d935f4464aa5",
  "https://open.spotify.com/playlist/37i9dQZEVXbLrQBcXqUtaC?si=7e5e4b07d14d48c1",
  "https://open.spotify.com/playlist/37i9dQZEVXbK4gjvS1FjPY?si=74c893af28ae4c9b",
  "https://open.spotify.com/playlist/37i9dQZEVXbKIVTPX9a2Sb?si=26d7f11138f04ea1",
  "https://open.spotify.com/playlist/37i9dQZEVXbMH2jvi6jvjk?si=2eaa60804f5e4283",
  "https://open.spotify.com/playlist/37i9dQZEVXbNFJfN1Vw8d9?si=44899cebbc5b4797",
  "https://open.spotify.com/playlist/37i9dQZEVXbLoATJ81JYXz?si=d3354713921a4670",
  "https://open.spotify.com/playlist/37i9dQZEVXbJiyhoAPEfMK?si=2364c949fbdc43c1",
  "https://open.spotify.com/playlist/37i9dQZEVXbMnz8KIWsvf9?si=e7cfb830999348d8",
  "https://open.spotify.com/playlist/37i9dQZEVXbIVYVBNw9D5K?si=6638cb9f5c2f4b10",
  "https://open.spotify.com/playlist/37i9dQZEVXbKkidEfWYRuD?si=b1ad7fad00874f56",
  "https://open.spotify.com/playlist/37i9dQZEVXbLnolsZ8PSNw?si=c61e36aa00b3433f",
  "https://open.spotify.com/playlist/37i9dQZEVXbMJJi3wgRbAy?si=6ac97bb5929741c6",
  "https://open.spotify.com/playlist/37i9dQZEVXbLRQDuF5jeBp?si=c836161138474ac1",
  "https://open.spotify.com/playlist/37i9dQZEVXbLdGSmz6xilI?si=57a7dea357204594"
  ]

// Extract playlist IDs from the URLs
const playlistIds = spotify_playlist_urls.map(url => url.match(/playlist\/(.*?)\?/)[1]);

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [trackUri, setTrackUri] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [songName, setSongName] = useState('');
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

const playRandomSong = () => {
  const randomPlaylistId = playlistIds[Math.floor(Math.random() * playlistIds.length)];

  spotifyApi.getPlaylist(randomPlaylistId)
    .then(playlistResponse => {
      setPlaylistName(playlistResponse.body.name);

      return spotifyApi.getPlaylistTracks(randomPlaylistId);
    })
    .then(response => {
      if (response.body.items.length) {
        const randomTrack = response.body.items[Math.floor(Math.random() * response.body.items.length)];

        setTrackUri(randomTrack.track.uri);
        setAlbumCover(randomTrack.track.album.images[0].url);  // Assuming the track has album images
        setSongName(randomTrack.track.name);

        return spotifyApi.play({
          uris: [randomTrack.track.uri]
        });
      }
    })
    .catch(err => {
      console.error('Error playing song:', err);
    });
}

function saveToPlaylist(playlistId) {
  if (!trackUri) {
    console.error("No track is currently playing.");
    return;
  }
  
  spotifyApi.addTracksToPlaylist(playlistId, [trackUri])
    .then(response => {
      console.log("Added track to playlist!");
    })
    .catch(error => {
      console.error("Failed to add track to playlist:", error);
    });
}

const [userPlaylists, setUserPlaylists] = useState([]);
const [selectedPlaylist, setSelectedPlaylist] = useState("");


useEffect(() => {
  if (!accessToken) return;
  spotifyApi.getUserPlaylists()
    .then(response => {
      setUserPlaylists(response.body.items);
    })
    .catch(error => {
      console.error("Failed to fetch user playlists:", error);
    });
}, [accessToken]);

return (
  
  <div>
    <button onClick={playRandomSong}>Play Random Song</button>
    {trackUri && (
      <div>
        <img src={albumCover} alt="Album Cover" style={{ width: '200px', height: '200px' }} />
        <h2>{songName}</h2>
        <p>From Playlist: {playlistName}</p>
        
        {/* UI to Save Song to Playlist */}
        <h3>Save to one of your playlists:</h3>
        <select 
          value={selectedPlaylist}
          onChange={e => setSelectedPlaylist(e.target.value)}
        >
          {userPlaylists.map(playlist => (
            <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
          ))}
        </select>
        <button onClick={() => saveToPlaylist(selectedPlaylist)}>
          Save to Selected Playlist
        </button>
      </div>
    )}
  </div>
);

}
