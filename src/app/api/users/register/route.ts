import { RegisterUserDto } from "@/utils/dtos";
import { prisma } from "@/utils/prisma";
import { registerSchema } from "@/utils/validationShemas";
import { NextRequest, NextResponse } from "next/server";
// import bcrypt from 'bcryptjs';
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/register
 * @description Create New User
 * @access Public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 },
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });
    const jwtPayload: JWTPayload = {
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };
    // @ Todo => generate JWT Token
    // const token = generateJWT(jwtPayload);
    await setCookie(jwtPayload);
    return NextResponse.json(
      { ...newUser, message: "registered & Authenticated" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
