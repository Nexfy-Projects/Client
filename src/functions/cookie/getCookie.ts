import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function GetAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const myCookie = cookies.access_token;

  res.status(200).json({ access_token: myCookie });

  return myCookie;
}
