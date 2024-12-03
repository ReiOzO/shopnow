import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();

  const graphData = await getSalesPerMonth();

  // Hàm format số tiền VND
  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card className="bg-pink-1"> {/* Màu nền hồng cho Total Revenue */}
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Tổng doanh thu</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-pink-600">{formatCurrency(totalRevenue)}</p> {/* Màu chữ hồng */}
          </CardContent>
        </Card>

        <Card className="bg-blue-4"> {/* Màu nền xanh dương cho Total Orders */}
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Tổng số hoá đơn</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-blue-100">{totalOrders}</p> {/* Màu chữ xanh dương nhạt */}
          </CardContent>
        </Card>

        <Card className="bg-purple-1"> {/* Màu nền tím nhạt cho Total Customer */}
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Tổng số khách hàng</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-amber-700">{totalCustomers}</p> 
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart (VND)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Bạn có thể xử lý chuyển đổi đơn vị VND cho dữ liệu biểu đồ tại đây nếu cần */}
          <SalesChart data={graphData.map(item => ({
            ...item,
            revenue: item.sales,
          }))} />
        </CardContent>
      </Card>
    </div>
  );
}