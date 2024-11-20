import GetAccessToken from "@/functions/cookie/getAccessCookie";

export async function GET(req: Request) {
  return await GetAccessToken(req);
}
