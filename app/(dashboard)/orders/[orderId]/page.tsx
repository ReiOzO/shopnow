import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColumns"

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`)
    const { orderDetails, customer } = await res.json()

    const { street, city, state, postalCode, country } = orderDetails.shippingAddress

    const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(orderDetails.totalAmount);

    return (
        <div className="flex flex-col p-10 gap-5">
            <p className="text-base-bold">
                Order ID: <span className="text-base-medium">{orderDetails._id}</span>
            </p>
            <p className="text-base-bold">
                Customer name: <span className="text-base-medium">{customer.name}</span>
            </p>
            <p className="text-base-bold">
                Shipping address: <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
            </p>
            <p className="text-base-bold">
                Total Paid: <span className="text-base-medium">{formattedTotalAmount}</span>
            </p>
            <p className="text-base-bold">
                Shipping rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
            </p>
            <p className="text-base-bold">
                Status: <span className="text-base-medium">{orderDetails.status}</span>
            </p>
            <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
        </div>
    )
}

export default OrderDetails

export const dynamic = "force-dynamic";