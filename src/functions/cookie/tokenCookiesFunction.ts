import { parse } from "cookie";

export async function getAccessToken(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const myCookie = cookies.access_token;

  // if (!myCookie) {
  //   // アクセストークンが存在しない場合のエラーレスポンス
  //   return new Response(JSON.stringify({ error: 'Access token not found' }), {
  //     status: 400,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  // アクセストークンを返す
  return new Response(JSON.stringify({ access_token: myCookie }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "set-cookie": myCookie as string,
    },
  });
}

/**
 * Removes the access token from the cookies.
 *
 * @param {Request} req - The request object containing the cookies.
 * @returns {Promise<Response>} - A response indicating the result of the token removal.
 */
export async function removeToken(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const myCookie = cookies.access_token;

  if (!myCookie) {
    // アクセストークンが存在しない場合のエラーレスポンス
    return new Response(JSON.stringify({ error: "Access token not found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Proper logging mechanism can be added here if needed

  // アクセストークンを削除
  return new Response(JSON.stringify({ message: "Token removed" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `access_token=; Max-Age=0; path=/`,
    },
  });
}
