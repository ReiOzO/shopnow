"use client"

import ArticleForm from "@/components/articles/ArticleForm"
import Loader from "@/components/custom ui/Loader"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ArticleDetails = ({ params }: { params: { articleId: string } }) => {
    const { articleId } = useParams();

    const [loading, setLoading] = useState(true)
    const [articleDetails, setArticleDetails] = useState<ArticleType | null>(null)

    const getArticleDetails = async () => {
        try {
            const res = await fetch(`/api/articles/${articleId}`, {
                method: "GET"
            })
            const data = await res.json()
            setArticleDetails(data)
            setLoading(false)
        } catch (err) {
            console.log("[articleId_GET]", err)
        }
    }

    useEffect(() => {
        if (articleId) {
            getArticleDetails()
        }
    }, [articleId])

    return loading ? <Loader /> : (
        <ArticleForm initialData={articleDetails} />
    )
}

export default ArticleDetails

export const dynamic = "force-dynamic";