import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCardProps } from "@/lib/definitions";

export default function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card className="hover:bg-secondary hover:text-secondary-foreground duration-300">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription> {subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                {body}
            </CardContent>
        </Card>
    )
}