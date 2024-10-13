import PageHeader from "@/components/admin/page-header";
import ProductForm from "@/components/admin/product-form";
import { getUniqueProductData } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
    const product = await getUniqueProductData(params.id)
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <PageHeader>Edit Products</PageHeader>
            </div>
            <ProductForm product={product} />
        </>
    )
}