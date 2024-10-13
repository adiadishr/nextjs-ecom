import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function ProductCardSkeleton() {
    return (
        <Card className="flex flex-col animate-pulse overflow-hidden">
            <div className="bg-gray-300 w-full aspect-video" />
            <CardHeader>
                <CardTitle>
                    <div className="bg-gray-300 w-3/4 h-6 rounded-full" />
                </CardTitle>
                <div className="bg-gray-300 w-1/2 h-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2 flex-grow">
                <div className="bg-gray-300 w-full h-4 rounded-full" />
                <div className="bg-gray-300 w-full h-4 rounded-full" />
                <div className="bg-gray-300 w-3/5 h-4 rounded-full" />
            </CardContent>
            <CardFooter>
                <div className="bg-gray-300 w-full h-10 rounded-lg" />
            </CardFooter>
        </Card>
    )
}