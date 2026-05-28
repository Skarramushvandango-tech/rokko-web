#!/usr/bin/env node
// Fetches Rokko! Records Spotify playlist and writes data/releases.json
// Requires env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
import fs from "node:fs";
import path from "node:path";

const PLAYLIST_ID = "6GBZNBRcta3DF6MCU5cVAP";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET env vars.");
  process.exit(1);
}

async function getToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const r = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!r.ok) throw new Error(`Token request failed: ${r.status} ${await r.text()}`);
  const j = await r.json();
  return j.access_token;
}

async function fetchAllTracks(token) {
  const tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=100&fields=next,items(added_at,track(id,name,external_urls,album(images),artists(id,name,external_urls)))`;
  while (url) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`Playlist fetch failed: ${r.status} ${await r.text()}`);
    const j = await r.json();
    for (const it of j.items) {
      if (it.track) tracks.push({ added_at: it.added_at, track: it.track });
    }
    url = j.next;
  }
  return tracks;
}

async function fetchPlaylistMeta(token) {
  const r = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}?fields=name,images,external_urls`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`Playlist meta failed: ${r.status}`);
  return r.json();
}

function dedupeArtists(tracks) {
  // Newest first based on added_at
  const sorted = [...tracks].sort((a, b) => (b.added_at || "").localeCompare(a.added_at || ""));
  const byId = new Map();
  for (const { track } of sorted) {
    for (const artist of track.artists || []) {
      if (!artist?.id || byId.has(artist.id)) continue;
      // Use this track's album image as the artist's tile cover (most recent release)
      const img = track.album?.images?.[0]?.url || null;
      byId.set(artist.id, {
        id: artist.id,
        name: artist.name,
        cover: img,
        spotifyUrl: artist.external_urls?.spotify || null,
        latestTrack: {
          id: track.id,
          name: track.name,
          url: track.external_urls?.spotify || null,
        },
      });
    }
  }
  return Array.from(byId.values());
}

async function main() {
  const token = await getToken();
  const [meta, tracks] = await Promise.all([fetchPlaylistMeta(token), fetchAllTracks(token)]);
  const artists = dedupeArtists(tracks);
  const out = {
    updated: new Date().toISOString(),
    playlist: {
      id: PLAYLIST_ID,
      name: meta.name,
      cover: meta.images?.[0]?.url || null,
      url: meta.external_urls?.spotify || null,
    },
    artistCount: artists.length,
    trackCount: tracks.length,
    artists,
  };
  const outPath = path.resolve("data/releases.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${outPath} — ${artists.length} artists, ${tracks.length} tracks`);
}

main().catch((e) => { console.error(e); process.exit(1); });
