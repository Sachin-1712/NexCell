import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default function DashboardPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground/95 sm:text-4xl">
                    AI Activity Dashboard
                </h1>
                <p className="text-base text-muted-foreground/80 max-w-2xl leading-relaxed">
                    Monitor recent agent activity across AI workflows.
                </p>
            </div>
            <DashboardClient />
        </main>
    );
}
