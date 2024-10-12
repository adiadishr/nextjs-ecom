const CURRECNY_FORMATTER = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
    return CURRECNY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-us")

export function formatNumber(amount: number) {
    return NUMBER_FORMATTER.format(amount)
}