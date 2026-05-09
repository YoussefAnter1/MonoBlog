import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "@/utils/types";

// Verify Toke For API EndPoint
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken")?.value as string;
    if (!jwtToken) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(jwtToken, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Verify Toke For Page
export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
