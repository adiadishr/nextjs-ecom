"use server";

import { z } from "zod";
import db from "./db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))
const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required")
})
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: fileSchema.optional(),
})

// action to add a product
export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }
    const data = result.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({
        data: {
            isAvailableForPurchase: true,
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    revalidatePath('/admin/products')
    redirect("/admin/products")
}

// action to toggle product availablity
export async function toggleProductAvailablity(id: string, isAvailableForPurchase: boolean) {
    await db.product.update({
        where: { id },
        data: { isAvailableForPurchase }
    })
    revalidatePath('/admin/products')
}

//action to delete product
export async function deleteProduct(id: string) {
    const product = await db.product.delete({
        where: { id }
    })
    if (product === null) {
        return notFound()
    }
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
    revalidatePath('/admin/products')
}

//action to update product
export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
    //validating data baesd on zod editSchema above
    const validateCheck = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (validateCheck.success === false) {
        return validateCheck.error.formErrors.fieldErrors
    }
    const parsedFormData = validateCheck.data
    //check if the product actually exists in the database
    const productDbData = await db.product.findUnique({ where: { id } })
    if (productDbData === null) {
        return notFound()
    }

    //check if the user has updated either the file or the image
    //if they haven't the data for that field will be null

    //old file path
    let filePath = productDbData.filePath
    if (parsedFormData.file != null && parsedFormData.file.size > 0) {
        //deleting old file and reassigning filePath value
        await fs.unlink(productDbData.filePath)
        filePath = `products/${crypto.randomUUID()}-${parsedFormData.file.name}`
        await fs.writeFile(filePath, Buffer.from(await parsedFormData.file.arrayBuffer()))
    }

    let imagePath = productDbData.imagePath
    if (parsedFormData.image != null && parsedFormData.image.size > 0) {
        //deleting old image and reassigning imagePath value
        await fs.unlink(`public${productDbData.imagePath}`)
        imagePath = `/products/${crypto.randomUUID()}-${parsedFormData.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await parsedFormData.image.arrayBuffer()))
    }

    //carry out the update operation
    await db.product.update({
        where: { id },
        data: {
            name: parsedFormData.name,
            description: parsedFormData.description,
            priceInCents: parsedFormData.priceInCents,
            filePath,
            imagePath,
        }
    })

    //redirect and revalidate
    revalidatePath('/admin/products')
    redirect("/admin/products")
}