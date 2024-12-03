import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        await connectToDB();

        // Truy cập params.collectionId đúng cách
        const collectionId = params?.collectionId;

        if (!collectionId) {
            return new NextResponse("Collection ID is required", { status: 400 });
        }

        const collection = await Collection.findById(params.collectionId).populate({ path: "products", model: Product });

        if (!collection) {
            return new NextResponse(
                JSON.stringify({ message: "Collection not found" }),
                { status: 404 }
            );
        }

        return NextResponse.json(collection, { status: 200 });
    } catch (err) {
        console.log("[collectionId_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        // Truy cập params.collectionId đúng cách
        const collectionId = params?.collectionId;

        if (!collectionId) {
            return new NextResponse("Collection ID is required", { status: 400 });
        }

        let collection = await Collection.findById(collectionId);

        if (!collection) {
            return new NextResponse("Collection not found", { status: 404 });
        }

        const { title, description, image } = await req.json();

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
        }

        collection = await Collection.findByIdAndUpdate(
            collectionId,
            { title, description, image },
            { new: true }
        );

        await collection.save();

        return NextResponse.json(collection, { status: 200 });
    } catch (err) {
        console.log("[collectionId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        await connectToDB()

        // Truy cập params.collectionId đúng cách
        const collectionId = params?.collectionId;

        if (!collectionId) {
            return new NextResponse("Collection ID is required", { status: 400 });
        }

        await Collection.findByIdAndDelete(collectionId)

        await Product.updateMany(
            { collections: params.collectionId },
            { $pull: { collections: params.collectionId } }
        );

        return new NextResponse("Collection is deleted", { status: 200 })
    } catch (err) {
        console.log("[collectionId_DELETE]", err)
        return new NextResponse("Internal Error", { status: 500 })
    }
};

export const dynamic = "force-dynamic";
