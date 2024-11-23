import GetAccessToken from "@/functions/cookie/getAccessTokenCookie";

export async function GET(req: Request) {
  return await GetAccessToken(req);
}
