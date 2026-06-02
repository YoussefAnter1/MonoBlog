import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

/**
 * @method GET
 * @route ~/api/articles/search?searchText=value
 * @description Get Single Articles By Search Text
 * @access Public
 */

export async function GET() {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count, }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
      
    );
  }
}
