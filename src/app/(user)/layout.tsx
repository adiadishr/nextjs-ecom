import Nav, { NavLink } from "@/components/navigation";
export const dynamic = "force-dynamic"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Nav>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/orders">My Orders</NavLink>
            </Nav>
            <div className="container my-6 sm:my-12 mx-auto max-sm:px-[5%]">
                {children}
            </div>
        </>
    )
}