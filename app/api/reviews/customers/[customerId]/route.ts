import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Review from "@/lib/models/Review";

export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
    try {
        const { customerId } = params;  // Lấy customerId từ params

        if (!customerId) {
            return new NextResponse("Customer ID is required", { status: 400 });
        }

        await connectToDB();

        // Truy vấn review của người dùng từ cơ sở dữ liệu
        const reviews = await Review.find({ customerClerkId: customerId }).populate({
            path: "products.product",
            model: Product,
        });

        if (!reviews || reviews.length === 0) {
            return new NextResponse("No reviews found for this customer", { status: 404 });
        }

        // Tạo phản hồi với dữ liệu reviews và header CORS
        const res = NextResponse.json(reviews, { status: 200 });

        // Thêm header CORS vào phản hồi
        res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');  // Allow localhost:3001
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return res;
    } catch (err) {
        console.error("[reviews_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";

