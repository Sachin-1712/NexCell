import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card className="transition-all duration-300 hover:bg-muted/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground/80">
                    {title}
                </CardTitle>
                <div className="rounded-full bg-background p-2 ring-1 ring-border/50 shadow-sm">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight text-foreground/90">{value}</div>
            </CardContent>
        </Card>
    );
}
