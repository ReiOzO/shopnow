import Article from "@/lib/models/Article";
import { connectToDB } from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        await connectToDB()

        const { title, description, image } = await req.json()
        const existingArticle = await Article.findOne({ title })

        if (existingArticle) {
            return new NextResponse("Article already exists", { status: 400 })
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 })
        }

        const newArticle = await Article.create({
            title,
            description,
            image,
        })

        await newArticle.save()

        return NextResponse.json(newArticle, { status: 200 })

    } catch (err) {
        console.log("[articles_POST]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()

        const articles = await Article.find().sort({ createdAt: "desc" })

        return NextResponse.json(articles, { status: 200 })
    } catch (err) {
        console.log("[articles_GET]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";
