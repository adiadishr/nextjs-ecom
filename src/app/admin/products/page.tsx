import PageHeader from "@/components/admin/products/header";
import ProductsTable from "@/components/admin/products/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    )
}