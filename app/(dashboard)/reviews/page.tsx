"use client"

import { DataTable } from "@/components/custom ui/DataTable"
import Loader from "@/components/custom ui/Loader"
import { columns } from "@/components/reviews/ReviewColumns"
import { Separator } from "@/components/ui/separator"

import { useEffect, useState } from "react"

const Reviews = () => {
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    const getReviews = async () => {
        try {
            const res = await fetch(`/api/reviews`)
            const data = await res.json()
            setReviews(data)
            setLoading(false)
        } catch (err) {
            console.log("[reviews_GET", err)
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <p className="text-heading2-bold">Reviews</p>
            <Separator className="bg-grey-1 my-5" />
            <DataTable columns={columns} data={reviews} searchKey="_id" />
        </div>
    )
}

export const dynamic = "force-dynamic";

export default Reviews