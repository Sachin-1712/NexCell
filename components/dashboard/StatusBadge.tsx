import { Badge } from "@/components/ui/badge";
import { ActivityStatus } from "@/lib/types";

interface StatusBadgeProps {
    status: ActivityStatus;
}

const statusConfig: Record<
    ActivityStatus,
    { label: string; className: string }
> = {
    success: {
        label: "Success",
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    },
    failed: {
        label: "Failed",
        className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
    },
    processing: {
        label: "Processing",
        className:
            "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    );
}
