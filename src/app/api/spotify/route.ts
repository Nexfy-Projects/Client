// app/api/auth/spotify/route.ts
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const params = new URL(req.url).searchParams;

  if (params.get("code")) {
    try {
      const token = await fetch(`https://accounts.spotify.com/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=authorization_code&code=${params.get("code")}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      }).then((res) => res.json());

      const user = await fetch(
        `https://api.spotify.com/v1/users/${token.user_id}`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        },
      );

      return NextResponse.json({ token, user }, { status: 200 });
    } catch (error) {
      throw new Response(JSON.stringify(error), { status: 500 });
    }
  }

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
  );
};
