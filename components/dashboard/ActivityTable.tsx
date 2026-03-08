"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Activity } from "@/lib/types";
import { formatActivityDate } from "@/lib/formatters";

interface ActivityTableProps {
    activities: Activity[];
    onRowClick: (activity: Activity) => void;
}

export function ActivityTable({ activities, onRowClick }: ActivityTableProps) {
    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 py-20 text-center transition-opacity animate-in fade-in duration-500">
                <div className="rounded-full bg-muted/30 p-4 ring-1 ring-border/50 mb-4 shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-muted-foreground/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <p className="text-sm font-medium text-foreground/80">
                    No activities match your current filters.
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground/60">
                    Try adjusting the search term or status.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-border/60 shadow-sm bg-card/30">
            <Table>
                <TableHeader>
                    <TableRow className="border-b-border/60 hover:bg-transparent">
                        <TableHead className="w-[120px] text-muted-foreground">Activity ID</TableHead>
                        <TableHead className="text-muted-foreground">User</TableHead>
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-right text-muted-foreground">Created Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow
                            key={activity.id}
                            onClick={() => onRowClick(activity)}
                            className="cursor-pointer border-b-border/40 transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted"
                        >
                            <TableCell className="font-mono text-xs font-medium text-muted-foreground/80">
                                {activity.id}
                            </TableCell>
                            <TableCell className="font-medium text-foreground/90">{activity.user}</TableCell>
                            <TableCell className="capitalize text-foreground/80">
                                {activity.type.replace(/_/g, " ")}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={activity.status} />
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                                {formatActivityDate(activity.createdAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
