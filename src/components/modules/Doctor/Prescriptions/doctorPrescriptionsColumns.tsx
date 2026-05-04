import { TPrescription } from "@/types/prescription.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export const doctorPrescriptionsColumns: ColumnDef<TPrescription>[] = [
  {
    accessorKey: "patient.name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.patient?.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span>{format(new Date(row.original.createdAt), "MMM dd, yyyy")}</span>
    ),
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.original.instructions}>
        {row.original.instructions}
      </div>
    ),
  },
  {
    id: "pdf",
    header: "PDF",
    cell: ({ row }) => {
      const pdfUrl = row.original.pdfUrl;
      return pdfUrl ? (
        <Button variant="ghost" size="sm" asChild>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <FileDown className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      ) : (
        <span className="text-xs text-muted-foreground">Not Available</span>
      );
    },
  },
];
