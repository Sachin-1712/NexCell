"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Activity, ActivityStatus } from "@/lib/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFilters } from "@/components/dashboard/ActivityFilters";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { ActivityDetailDialog } from "@/components/dashboard/ActivityDetailDialog";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardClient() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | ActivityStatus>(
        "all"
    );
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    );

    useEffect(() => {
        async function fetchActivities() {
            try {
                const res = await fetch("/api/activities");
                if (!res.ok) throw new Error("Failed to fetch activities");
                const data: Activity[] = await res.json();
                setActivities(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An unexpected error occurred"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchActivities();
    }, []);

    // Stats based on full dataset — not affected by filters
    const stats = useMemo(() => {
        const total = activities.length;
        const successful = activities.filter((a) => a.status === "success").length;
        const failed = activities.filter((a) => a.status === "failed").length;
        return { total, successful, failed };
    }, [activities]);

    // Filtered activities — derived from search + status filter
    const filteredActivities = useMemo(() => {
        return activities.filter((activity) => {
            const matchesSearch =
                search === "" ||
                activity.user.toLowerCase().includes(search.toLowerCase()) ||
                activity.type.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || activity.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [activities, search, statusFilter]);

    const handleRowClick = useCallback((activity: Activity) => {
        setSelectedActivity(activity);
    }, []);

    const handleDialogClose = useCallback((open: boolean) => {
        if (!open) setSelectedActivity(null);
    }, []);

    // ---------- Loading state ----------
    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                {/* Skeleton stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-border/60 bg-card/20 p-6 shadow-sm">
                            <Skeleton className="mb-3 h-4 w-24 bg-muted/40" />
                            <Skeleton className="h-8 w-16 bg-muted/40" />
                        </div>
                    ))}
                </div>

                {/* Skeleton filters */}
                <div className="flex gap-3">
                    <Skeleton className="h-11 w-full sm:w-64 rounded-xl bg-card/30 border border-border/40" />
                    <Skeleton className="h-11 w-full sm:w-40 rounded-xl bg-card/30 border border-border/40" />
                </div>

                {/* Skeleton table rows */}
                <div className="rounded-xl border border-border/60 bg-card/10 overflow-hidden space-y-px">
                    <div className="bg-muted/10 h-10 w-full mb-1"></div>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="px-4 py-3 border-b border-border/30">
                            <Skeleton className="h-8 w-full rounded-md bg-muted/30" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ---------- Error state ----------
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-200 bg-red-50 py-16 text-center">
                <p className="text-sm font-medium text-red-700">
                    Failed to load activities.
                </p>
                <p className="mt-1 text-xs text-red-500">
                    Please refresh and try again.
                </p>
            </div>
        );
    }

    // ---------- Main dashboard ----------
    return (
        <div className="space-y-6">
            {/* Stats strip */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Activities"
                    value={stats.total}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Successful"
                    value={stats.successful}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Failed"
                    value={stats.failed}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Filters */}
            <ActivityFilters
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {/* Activity count */}
            <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                    {filteredActivities.length}
                </span>{" "}
                of {activities.length} activities
            </p>

            {/* Table */}
            <ActivityTable
                activities={filteredActivities}
                onRowClick={handleRowClick}
            />

            {/* Detail Dialog */}
            <ActivityDetailDialog
                activity={selectedActivity}
                open={selectedActivity !== null}
                onOpenChange={handleDialogClose}
            />
        </div>
    );
}
