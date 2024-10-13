"use strict";

import { NextApiRequest, NextApiResponse } from "next";

export const getSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.access_token;
  const { q, type, offset, limit } = req.query;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q as string
      )}&type=${type}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error("Error in response data:", error);
    res.status(500).json({ error: error });
  }
};

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
      query
    )}&type=track&offset=${newOffset}&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.json();
};
