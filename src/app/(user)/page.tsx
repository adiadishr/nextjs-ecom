import { getMostPopularProducts, getNewestProducts } from "@/lib/data";
import ProductGridSection from "@/components/user/product-grid-section";

export default function Page() {
    return (
        <main className="space-y-6 md:space-y-12">
            <ProductGridSection title="Popular Products" fetcher={getMostPopularProducts} />
            <ProductGridSection title="Newest Products" fetcher={getNewestProducts} />
        </main>
    )
}