import {
  getAccessToken,
  removeToken,
} from "@/functions/cookie/tokenCookiesFunction";

export async function GET(req: Request) {
  return await getAccessToken(req);
}

export async function DELETE(req: Request) {
  return await removeToken(req);
}
