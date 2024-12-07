"use client";

import { columns } from "@/components/articles/ArticleColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Articles = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const getArticles = async () => {
        try {
            const res = await fetch("/api/articles", {
                method: "GET",
            });
            const data = await res.json();
            setArticles(data);
            setLoading(false);
        } catch (err) {
            console.log("[articles_GET]", err);
        }
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="text-heading2-bold">Articles</p>
                <Button className="bg-blue-1 text-white" onClick={() => router.push("/articles/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Article
                </Button>
            </div>
            <Separator className="bg-grey-1 my-4" />
            <DataTable columns={columns} data={articles} searchKey="title" />
        </div>
    )
};

export default Articles;

export const dynamic = "force-dynamic";