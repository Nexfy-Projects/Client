import { NextRequest } from 'next/server';

// spotifyのapiをenvから取得
const SPOTIFY_API = process.env.SPOTIFY_API;

export function GET(req: NextRequest) {
  const state = 1;
}
