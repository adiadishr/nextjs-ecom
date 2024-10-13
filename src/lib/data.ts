import db from "@/lib/db";

//Admin

export async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

export async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true }
        })
    ])

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
    }
}

export async function getProductData() {
    const [activeProducts, inactiveProducts] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } })
    ])
    return {
        activeProducts,
        inactiveProducts
    }
}

export async function getProductTableData() {
    const ProductTableData = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
        },
        orderBy: { name: "asc" },
    })
    return ProductTableData
}

export async function getUniqueProductData(id: string) {
    const data = await db.product.findUnique({
        where: { id }
    })
    return data
}

//User

export async function getMostPopularProducts() {

    return await db.product.findMany(
        {
            where: { isAvailableForPurchase: true },
            orderBy: { orders: { _count: "desc", } },
            take: 6,
        })
}

export async function getNewestProducts() {

    return await db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6,
    })
}