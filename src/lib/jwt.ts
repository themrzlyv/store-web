import { SignJWT, jwtVerify } from "jose";
import { TokenPayload } from "./types";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJWT(payload: TokenPayload, expiresIn: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secret);
}

export async function verifyJWT(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}
