import { Loader } from "lucide-react"

export default function Loading() {
    return (
        <main className="flex justify-center min-h-[calc(100vh-104px)] sm:min-h-[calc(100vh-152px)] items-center">
            <Loader className="size-24 animate-spin text-muted-foreground/80" />
        </main>
    )
}