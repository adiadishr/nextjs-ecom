import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-104px)] sm:min-h-[calc(100vh-152px)] items-center justify-center p-12 text-center flex-col">
            <p className="text-lg font-semibold pb-2">404 - Admin Page Not Found</p>
            <Button asChild>
                <Link href="/admin">Go back to Admin Dashboard</Link>
            </Button>
        </main>
    )
}