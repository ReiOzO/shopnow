"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import StatusSelect from "../custom ui/StatusSelect";

export const columns: ColumnDef<OrderColumnType>[] = [
    {
        accessorKey: "_id",
        header: "Order",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/orders/${row.original._id}`}
                    className="hover:text-red-1"
                >
                    {row.original._id}
                </Link>
            );
        },
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "totalAmount",
        header: "Total (VND)",
        cell: ({ row }) => {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(row.original.totalAmount);
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const [status, setStatus] = useState<string>(row.original.status || "Đang giao");

            const handleChange = async (newStatus: string) => {
                setStatus(newStatus);
                try {
                    await fetch(`/api/orders/${row.original._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    });
                    console.log(`Status for order ${row.original._id} updated to ${newStatus}`);
                } catch (error) {
                    console.error("Failed to update status:", error);
                }
            };

            return (
                <StatusSelect
                    value={status}
                    onChange={handleChange}
                />
            );
        },
    }
];