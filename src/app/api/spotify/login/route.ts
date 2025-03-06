import { NextResponse } from "next/server";
import querystring from "querystring";
import { generateRandomString } from "../../../../functions/generateRandomString";

// 環境変数からクライアントIDとリダイレクトURIを取得
const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;

export async function GET() {
  const state = generateRandomString(16); // ランダムな文字列を生成
  const scope = "user-read-private user-read-email"; // Spotifyの認証スコープ

  // Spotify認証URLにリダイレクト
  const url = "https://accounts.spotify.com/authorize?";
  const body = {
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  };

  const query = url + querystring.stringify(body);

  return NextResponse.redirect(query); // サーバーからリダイレクト
}
