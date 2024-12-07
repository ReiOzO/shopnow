import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { orderId: String } }) => {
    try {
        await connectToDB()

        const orderDetails = await Order.findById(params.orderId).populate({
            path: "products.product",
            model: Product
        })

        if (!orderDetails) {
            return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
        }

        const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId })

        // Trả về thông tin đơn hàng và khách hàng, bao gồm status
        return NextResponse.json(
            {
                orderDetails: {
                    ...orderDetails.toObject(), // Chuyển sang object
                    status: orderDetails.status || "Đang giao", // Bao gồm status
                },
                customer: customer || { name: "Unknown Customer" }, // Xử lý nếu không tìm thấy khách hàng
            },
            { status: 200 }
        );

        // return NextResponse.json({ orderDetails, customer }, { status: 200 })
    } catch (err) {
        console.log("[orderId_GET]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const PUT = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
    try {
        await connectToDB();

        const { status } = await req.json();

        // Kiểm tra giá trị hợp lệ
        if (!["Đang giao", "Đã giao", "Hủy đơn"].includes(status)) {
            return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
        }

        // Cập nhật trạng thái trong MongoDB
        const updatedOrder = await Order.findByIdAndUpdate(
            params.orderId,
            { status },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error("[orderId_PUT]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export const dynamic = "force-dynamic";