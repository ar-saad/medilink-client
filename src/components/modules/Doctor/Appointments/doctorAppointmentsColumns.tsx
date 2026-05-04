import { TAppointment } from "@/types/appointment.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const doctorAppointmentsColumns: ColumnDef<TAppointment>[] = [
  {
    accessorKey: "patient.name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.patient?.name || "N/A"}</div>
    ),
  },
  {
    id: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      if (!schedule?.startDateTime) return "N/A";
      return (
        <div className="flex flex-col">
          <span className="text-sm">
            {format(new Date(schedule.startDateTime), "MMM dd, yyyy")}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(schedule.startDateTime), "hh:mm a")} -{" "}
            {format(new Date(schedule.endDateTime!), "hh:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "COMPLETED"
              ? "default"
              : status === "CANCELED"
              ? "destructive"
              : status === "INPROGRESS"
              ? "secondary"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <Badge
          className={
            status === "PAID"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
          }
        >
          {status}
        </Badge>
      );
    },
  },
];
