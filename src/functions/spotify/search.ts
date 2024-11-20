"use strict";

export async function performSearch(
  query: { q: string; type: string; offset: number; limit: number },
  token: string | null,
) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query.q}&type=${query.type}&offset=${query.offset}&limit=${query.limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  return result;
}

export const GetTrack = async (id: string | undefined) => {
  const res = await fetch(`http://localhost:5001/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const SearchApi = async (query: string, newOffset: number) => {
  const res = await fetch(
    `http://localhost:5001/search?q=${encodeURIComponent(
      query,
    )}&type=track&offset=${newOffset}&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return res.json();
};
