import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./product-card";
import { Suspense } from "react";
import ProductCardSkeleton from "./product-card-skeleton";

export default function ProductGridSection({ fetcher, title }: { fetcher: () => Promise<Product[]>, title: string }) {
    return (
        <div className="space-y-6">
            <div className="flex w-full justify-between gap-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button variant="outline" className="font-medium" asChild>
                    <Link className="space-x-2 flex items-center" href="/products">
                        <span>View all</span>
                        <ArrowRight className="size-4 " />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }>
                    <ProductSuspense fetcher={fetcher} />
                </Suspense>
            </div>
        </div >
    )
}

async function ProductSuspense({ fetcher }: { fetcher: () => Promise<Product[]> }) {
    return (
        (await fetcher()).map(product => (
            <ProductCard key={product.id} product={product} />
        )))
}