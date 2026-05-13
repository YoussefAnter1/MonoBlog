// import { articles } from "@/utils/data";
import { UpdateArticleDto } from "@/utils/dtos";
import { prisma } from "@/utils/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
  //   params: { id: string };
}
/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Get Single Article By Id
 * @access Public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    // const article = articles.find((a) => a.id === parseInt(id));
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(article, { status: 200 });
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
 * @route ~/api/articles/:id
 * @description Update Article
 * @access Private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }
    const { id } = await params;
    // const article = articles.find((a) => a.id === parseInt(id));
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    }
    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json({ updatedArticle }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Deleted Article
 * @access Private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    }
    // deleting the article
    await prisma.article.delete({ where: { id: parseInt(id) } });

    // deleting the comments that belong to this article
    const commentIds: number[] = article?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
