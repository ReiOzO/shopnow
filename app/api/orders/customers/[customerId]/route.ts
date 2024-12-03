import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";

// Route handler cho customerId
// export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
//     try {
//         const { customerId } = params;  // Lấy customerId từ params

//         if (!customerId) {
//             return new NextResponse("Customer ID is required", { status: 400 });
//         }

//         await connectToDB();

//         // Truy vấn đơn hàng của người dùng từ cơ sở dữ liệu
//         const orders = await Order.find({ customerClerkId: customerId }).populate({
//             path: "products.product",
//             model: Product,
//         });

//         if (!orders || orders.length === 0) {
//             return new NextResponse("No orders found for this customer", { status: 404 });
//         }

//         return NextResponse.json(orders, { status: 200 });
//     } catch (err) {
//         console.error("[orders_GET]", err);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// };

export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
    try {
        const { customerId } = params;  // Lấy customerId từ params

        if (!customerId) {
            return new NextResponse("Customer ID is required", { status: 400 });
        }

        await connectToDB();

        // Truy vấn đơn hàng của người dùng từ cơ sở dữ liệu
        const orders = await Order.find({ customerClerkId: customerId }).populate({
            path: "products.product",
            model: Product,
        });

        if (!orders || orders.length === 0) {
            return new NextResponse("No orders found for this customer", { status: 404 });
        }

        // Tạo phản hồi với dữ liệu orders và header CORS
        const res = NextResponse.json(orders, { status: 200 });

        // Thêm header CORS vào phản hồi
        res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');  // Allow localhost:3001
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return res;
    } catch (err) {
        console.error("[orders_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";

