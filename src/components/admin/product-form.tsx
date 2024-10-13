"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addProduct, updateProduct } from "@/lib/actions"
import { formatCurrency } from "@/lib/formatters"
import { Product } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function ProductForm({ product }: { product?: Product | null }) {

    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {})

    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

    return (
        <form action={action} className="space-y-8 mb-6 sm:mb-12 mt-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="Please enter the product name" required defaultValue={product?.name || ""} />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input type="number" id="priceInCents" name="priceInCents" placeholder="Please enter the amount in cents" value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)} required />
                <div className="text-muted-foreground">
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Please enter the product description" required defaultValue={product?.description || ""} className="resize-y" />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required={product == null} />
                {product != null && <div className="text-muted-foreground">{product.filePath}</div>}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {product != null && <Image src={product.imagePath} alt={product.name} width={200} height={200} className="rounded-lg" />}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save"}</Button>
    )
}