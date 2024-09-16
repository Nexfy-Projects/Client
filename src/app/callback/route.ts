import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';
import cookie from 'cookie';

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // ここを適切なベース URL に設定

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get('code') || null;
  const state = url.searchParams.get('state') || null;

  // stateがnullの場合はエラー処理
  if (state === null) {
    return NextResponse.redirect(
      `${BASE_URL}/?error=${querystring.stringify({
        error: 'state_mismatch',
      })}`,
    );
  }

  // 認証トークンを取得するためのオプション
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    }),
  };

  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Spotify API:', errorText);
      return NextResponse.redirect(
        `${BASE_URL}/?error=${querystring.stringify({ error: 'api_error' })}`,
      );
    }

    const data = await response.json();

    if (data.error) {
      // エラーが発生した場合はエラーメッセージを返す
      console.error('Error in response data:', data.error);
      return NextResponse.redirect(
        `${BASE_URL}/?error=${querystring.stringify({ error: data.error })}`,
      );
    } else {
      // トークンを取得し、次の処理を行う（例：トークンをセッションに保存）
      const { access_token, refresh_token } = data;

      // Cookieにアクセストークンとリフレッシュトークンを設定
      const response = NextResponse.redirect(`${BASE_URL}`);

      response.headers.set(
        'Set-Cookie',
        cookie.serialize('access_token', access_token, {
          httpOnly: true, // クライアントサイドでJavaScriptからアクセスできないようにする
          secure: process.env.NODE_ENV === 'production', // プロダクション環境でのみHTTPSを使用
          sameSite: 'strict', // CSRF攻撃を防ぐ
          maxAge: 3600, // 1時間後に期限切れ
          path: '/', // Cookieが適用されるパス
        }),
      );

      response.headers.set(
        'Set-Cookie',
        cookie.serialize('refresh_token', refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60, // 30日後に期限切れ
          path: '/',
        }),
      );

      return response;
    }
  } catch (error) {
    console.error('Error fetching access token:', error);

    // リクエストが失敗した場合のエラーハンドリング
    return NextResponse.redirect(
      `${BASE_URL}/?error=${querystring.stringify({ error: 'invalid_token' })}`,
    );
  }
}
