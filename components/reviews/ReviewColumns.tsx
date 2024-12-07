"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ReviewType>[] = [
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/products/${row.original.product._id}`}
                    className="hover:text-red-1"
                >
                    {row.original.product.title}
                </Link>
            );
        },
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
];