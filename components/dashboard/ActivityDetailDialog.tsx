"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Activity } from "@/lib/types";
import { formatActivityDate } from "@/lib/formatters";

interface ActivityDetailDialogProps {
    activity: Activity | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ActivityDetailDialog({
    activity,
    open,
    onOpenChange,
}: ActivityDetailDialogProps) {
    if (!activity) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card/95 border-border/60 shadow-2xl backdrop-blur-xl sm:rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight text-foreground/90">Activity Details</DialogTitle>
                    <DialogDescription className="text-muted-foreground/80">
                        Detailed information for activity{" "}
                        <span className="font-mono font-semibold text-primary">{activity.id}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    <DetailRow label="Activity ID">
                        <span className="font-mono text-sm font-medium text-foreground/90">
                            {activity.id}
                        </span>
                    </DetailRow>

                    <DetailRow label="User">
                        <span className="font-medium text-foreground/90">{activity.user}</span>
                    </DetailRow>

                    <DetailRow label="Type">
                        <span className="capitalize text-foreground/80">
                            {activity.type.replace(/_/g, " ")}
                        </span>
                    </DetailRow>

                    <DetailRow label="Status">
                        <StatusBadge status={activity.status} />
                    </DetailRow>

                    <DetailRow label="Created">
                        <span className="text-foreground/80">
                            {formatActivityDate(activity.createdAt)}
                        </span>
                    </DetailRow>

                    <DetailRow label="Description">
                        <p className="text-sm leading-relaxed text-muted-foreground/90 bg-muted/20 p-3 rounded-lg border border-border/40">
                            {activity.description}
                        </p>
                    </DetailRow>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-[100px_1fr] gap-2">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div>{children}</div>
        </div>
    );
}
