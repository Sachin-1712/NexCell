"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ActivityStatus } from "@/lib/types";

interface ActivityFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: "all" | ActivityStatus;
    onStatusFilterChange: (value: "all" | ActivityStatus) => void;
}

export function ActivityFilters({
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: ActivityFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center bg-card/30 border border-border/60 p-3 rounded-xl shadow-sm backdrop-blur-sm">
            <Input
                placeholder="Search by user or type…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="sm:max-w-xs bg-background/50 border-border/60"
            />
            <Select
                value={statusFilter}
                onValueChange={(value) =>
                    onStatusFilterChange(value as "all" | ActivityStatus)
                }
            >
                <SelectTrigger className="sm:w-[160px] bg-background/50 border-border/60">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
