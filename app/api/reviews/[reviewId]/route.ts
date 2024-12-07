import Customer from "@/lib/models/Customer";
import Product from "@/lib/models/Product";
import Review from "@/lib/models/Review";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { reviewId: String } }) => {
    try {
        await connectToDB()

        const reviewDetails = await Review.findById(params.reviewId).populate({
            path: "products.product",
            model: Product
        })

        if (!reviewDetails) {
            return new NextResponse(JSON.stringify({ message: "Review Not Found" }), { status: 404 })
        }

        const customer = await Customer.findOne({ clerkId: reviewDetails.customerClerkId })

        return NextResponse.json({ reviewDetails, customer }, { status: 200 })
    } catch (err) {
        console.log("[reviewId_GET]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";