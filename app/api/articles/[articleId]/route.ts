import Article from "@/lib/models/Article";
import { connectToDB } from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
    try {
        await connectToDB();

        const articleId = params?.articleId;

        if (!articleId) {
            return new NextResponse("Article ID is required", { status: 400 });
        }

        const article = await Article.findById(articleId);

        if (!article) {
            return new NextResponse("Article not found", { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (err) {
        console.error("[articleId_GET] Error:", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const POST = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const articleId = params?.articleId;

        if (!articleId) {
            return new NextResponse("Article ID is required", { status: 400 });
        }

        let article = await Article.findById(articleId);

        if (!article) {
            return new NextResponse("Article not found", { status: 404 });
        }

        const { title, description, image } = await req.json();

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
        }

        article = await Article.findByIdAndUpdate(
            articleId,
            { title, description, image },
            { new: true }
        );

        return NextResponse.json(article, { status: 200 });
    } catch (err) {
        console.error("[articleId_POST] Error:", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const articleId = params?.articleId;

        if (!articleId) {
            return new NextResponse("Article ID is required", { status: 400 });
        }

        const deletedArticle = await Article.findByIdAndDelete(articleId);

        if (!deletedArticle) {
            return new NextResponse("Article not found", { status: 404 });
        }

        return new NextResponse("Article is deleted", { status: 200 });
    } catch (err) {
        console.error("[articleId_DELETE] Error:", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
