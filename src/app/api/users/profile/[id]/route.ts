import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationShemas";

interface Props {
  params: Promise<{ id: string }>;
  // params: { id: string };
}
/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description Delete Profile
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // const authToken = request.cookies.get("jwtToken")?.value as string;
    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      // deleting the user
      await prisma.user.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        {
          message: "your profile (account) has been deleted",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete his profile, forbidden" },
      { status: 403 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @description Get Profile By Id
 * @access private
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    console.log("This is the ", request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "your are not allowed, access denied" },
        { status: 403 },
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @description Update Profile
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as UpdateUserDto;
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    if (body.password) {
      // if (body.password.length < 6) {
      //   return NextResponse.json(
      //     { message: "password should be minimum 6 characters" },
      //     { status: 404 },
      //   );
      // }
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    const { password: _, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
