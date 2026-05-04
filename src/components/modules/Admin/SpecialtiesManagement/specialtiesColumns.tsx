import DateCell from "@/components/shared/cell/DateCell";
import { TSpecialty } from "@/types/specialty.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const specialtiesColumns: ColumnDef<TSpecialty>[] = [
  {
    id: "icon",
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.original.icon ? (
          <Image
            src={row.original.icon}
            alt={row.original.title}
            width={32}
            height={32}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
            No icon
          </div>
        )}
      </div>
    ),
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];
