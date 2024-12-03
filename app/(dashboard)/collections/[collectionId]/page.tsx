"use client"

import CollectionForm from "@/components/collections/CollectionForm"
import Loader from "@/components/custom ui/Loader"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
    const { collectionId } = useParams();

    const [loading, setLoading] = useState(true)
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${collectionId}`, {
                method: "GET"
            })
            const data = await res.json()
            setCollectionDetails(data)
            setLoading(false)
        } catch (err) {
            console.log("[collectionId_GET]", err)
        }
    }

    useEffect(() => {
        if (collectionId) {
            getCollectionDetails() // Gọi hàm khi có collectionId
        }
    }, [collectionId]) // Thêm collectionId vào dependencies của useEffect

    return loading ? <Loader /> : (
        <CollectionForm initialData={collectionDetails} />
    )
}

export default CollectionDetails

export const dynamic = "force-dynamic";