"use strict";

import {
  AudioAnalysis,
  type SearchResult,
} from "@/interfaces/spotifyInterface";

export async function performSearch(
  search: string | null,
  token: string | null,
) {
  const query = {
    q: search,
    offset: 10,
    limit: 20,
    type: "track",
  };
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query.q}&type=${query.type}&offset=${query.offset}&limit=${query.limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch track details");
  }

  const result: SearchResult = await res.json();

  return result;
}

export const trackDetails = async (
  id: string | null,
  token: string | null,
): Promise<AudioAnalysis> => {
  const res = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch track details");
  }
  const result: AudioAnalysis = await res.json();
  return result;
};
