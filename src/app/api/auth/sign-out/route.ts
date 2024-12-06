import { TOKEN_KEY } from "@/shared/data/constants";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Log out successful!" });

  res.cookies.delete(TOKEN_KEY);

  return res;
}
