import { LoginUserDto } from "@/utils/dtos";
import { prisma } from "@/utils/prisma";
import { loginSchema } from "@/utils/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";
/**
 * @method POST
 * @route ~/api/users/login
 * @description Login User
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password " },
        { status: 400 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password " },
        { status: 400 },
      );
    }
    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    // @ Todo => generate JWT Token
    // const token = generateJWT(jwtPayload);

    // // ---
    // (await cookies()).set("jwtToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // development = http , production = https
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 30, //30
    // });
    await setCookie(jwtPayload);
    return NextResponse.json({ message: "Authenticated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
