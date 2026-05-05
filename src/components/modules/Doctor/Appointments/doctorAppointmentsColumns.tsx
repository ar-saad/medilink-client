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
  {
    id: "review",
    header: "Rating",
    cell: ({ row }) => {
      const review = row.original.review;
      if (!review) return <span className="text-muted-foreground text-xs italic">No rating</span>;
      
      return (
        <div className="flex items-center gap-1" title={review.comment || ""}>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-3 w-3 ${
                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium">{review.rating.toFixed(1)}</span>
        </div>
      );
    },
  },
];
