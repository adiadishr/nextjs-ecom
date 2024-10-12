import Nav, { NavLink } from "@/components/admin/navigation";
export const dynamic = "force-dynamic"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Nav>
                <NavLink href="/admin">Dashboard</NavLink>
                <NavLink href="/admin/products">Products</NavLink>
                <NavLink href="/admin/users">Customers</NavLink>
                <NavLink href="/admin/orders">Sales</NavLink>
            </Nav>
            <div className="container my-6 sm:my-12 mx-auto max-sm:px-[5%]">
                {children}
            </div>
        </>
    )
}