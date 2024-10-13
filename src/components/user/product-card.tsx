import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Product } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="hover:bg-muted duration-300 flex flex-col overflow-hidden">
            <div className="relative w-full h-auto aspect-video">
                <Image src={product.imagePath} alt={product.name} fill />
            </div>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{formatCurrency(product.priceInCents / 100)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{product.description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size="lg" className="w-full">
                    <Link href={`/products/${product.id}/purchase`}>Purchase</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}