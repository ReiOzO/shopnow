"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => row.index + 1,  // Sử dụng row.index để lấy số thứ tự, cộng thêm 1 vì chỉ số bắt đầu từ 0
        enableSorting: false,  // Bạn có thể tắt tính năng sắp xếp cho cột này
        enableColumnFilter: false,  // Tắt lọc cho cột này nếu cần
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (<Link href={`/articles/${row.original._id}`} className="hover:text-red-1">{row.original.title}</Link>)
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <Delete item="article" id={row.original._id} />
    },
]