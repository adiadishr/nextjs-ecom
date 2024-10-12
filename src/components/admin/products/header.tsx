export default function PageHeader({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-xl font-bold mb-4">
            {children}
        </h1>
    )
}