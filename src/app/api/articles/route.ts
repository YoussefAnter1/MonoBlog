import { NextRequest, NextResponse } from "next/server";
// import { articles } from "@/utils/data";
import { createArticleSchema } from "@/utils/validationShemas";
// import { Article } from "@/utils/types";
import { CreateArticleDto } from "@/utils/dtos";
import { Article } from "@prisma/client";
// import { PrismaClient } from "@/app/generated/prisma";
// import { PrismaClient, Article } from "../../../../app/generated/prisma";
// import {PrismaClient} from "../../../../prisma"
// import {PrismaClient,Article} from  "@prisma/client";
// import { PrismaClient } from '@prisma/client';
// import { PrismaClient,Article } from "../../../../prisma";

// import { PrismaClient } from "@/src/generated/prisma";
// const prisma = new PrismaClient();
// const prisma = new PrismaClient({});
// import PrismaClient from '@prisma/client';
// import { Prisma } from "../../../../prisma/client";
// import { prisma } from "@/utils/prisma";
import { prisma } from "@/utils/prisma";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method GET
 * @route ~/api/articles
 * @description Get Articles By Page Number
 * @access Public
 */

export async function GET(request: NextRequest) {
  try {
    // console.log(request);
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    console.log(pageNumber);
    // console.log("this", request.headers.get("accept-language"));
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create New Article
 * @access Private
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as CreateArticleDto;
    // if (body.title === "" || body.title.length < 2) {
    //   return NextResponse.json({ message: "title is require" }, { status: 400 });
    // }

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json({ newArticle }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
