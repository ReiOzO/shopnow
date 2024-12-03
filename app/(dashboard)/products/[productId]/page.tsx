"use client"

import Loader from '@/components/custom ui/Loader'
import ProductForm from '@/components/products/ProductForm'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductDetails = ({ params }: { params: { productId: string } }) => {
    const { productId } = useParams();

    const [loading, setLoading] = useState(true)
    const [productDetails, setProductDetails] = useState<ProductType | null>(null)

    const getProductDetails = async () => {
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: "GET"
            })
            const data = await res.json()
            setProductDetails(data)
            setLoading(false)
        } catch (err) {
            console.log("[productId_GET]", err)
        }
    }

    useEffect(() => {
        if (productId) {
            getProductDetails() // Gọi hàm khi có collectionId
        }
    }, [productId]) // Thêm collectionId vào dependencies của useEffect

    return loading ? <Loader /> : (
        <ProductForm initialData={productDetails} />
    )
}

export default ProductDetails

export const dynamic = "force-dynamic";