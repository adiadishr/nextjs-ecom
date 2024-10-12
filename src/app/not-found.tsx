import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center p-12 text-center flex-col">
            <p className="text-lg font-semibold pb-2">404 - Page Not Found</p>
            <Button asChild>
                <Link href="/">Go back</Link>
            </Button>
        </main>
    )
}