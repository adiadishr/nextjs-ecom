import DashboardCard from "@/components/admin/dashboard-card";
import { getProductData, getSalesData, getUserData } from "@/lib/data";
import { formatNumber, formatCurrency } from "@/lib/formatters";

export default async function Page() {

    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="Sales"
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title="Customers"
                subtitle={`${formatCurrency(userData.averageValuePerUser)} in average value`}
                body={formatNumber(userData.userCount)}
            />
            <DashboardCard
                title="Active Products"
                subtitle={`${formatNumber(productData.inactiveProducts)} Inactive`}
                body={formatNumber(productData.activeProducts)}
            />
        </div >
    )
}

