import cookie from "cookie";

export default async function GetAccessToken(req: Request) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const myCookie = cookies.access_token;

  if (!myCookie) {
    // アクセストークンが存在しない場合のエラーレスポンス
    return new Response(JSON.stringify({ error: "Access token not found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // アクセストークンを返す
  return new Response(JSON.stringify({ access_token: myCookie }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
