import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getProductTableData } from '@/lib/data'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { CheckCircle2, MoreVertical, XCircleIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './product-actions'

export default async function ProductsTable() {

    const products = await getProductTableData()

    if (products.length === 0) {
        return <div className="text-desctructive">No products found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Available for purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailableForPurchase ? <CheckCircle2 className='text-lime-600' /> : <XCircleIcon className='text-destructive' />}
                        </ TableCell>
                        <TableCell>
                            {product.name}
                        </ TableCell>
                        <TableCell>
                            {formatCurrency(product.priceInCents / 100)}
                        </ TableCell>
                        <TableCell>
                            {formatNumber(product._count.orders)}
                        </ TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger className='outline-none rounded-full bg-transparent duration-300 hover:bg-accent px-[.4rem] py-[.35rem] focus-visible:text-foreground'>
                                    <MoreVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link download href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}