import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";
import { TOKEN_KEY } from "@/shared/data/constants";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 400 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password!" },
        { status: 400 }
      );
    }

    const accessToken = await signJWT(
      { userId: user.id, role: user.role },
      "24h"
    );

    const res = NextResponse.json({ message: "Login successful!" });

    res.cookies.set(TOKEN_KEY, accessToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
