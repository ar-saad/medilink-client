import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { Badge } from "@/components/ui/badge";
import { TAdmin } from "@/types/admin.types";
import { UserStatus } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";

export const adminsColumns: ColumnDef<TAdmin>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Admin",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto || undefined}
      />
    ),
  },
  {
    id: "role",
    accessorKey: "user.role",
    enableSorting: false,
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.user?.role;
      return (
        <Badge variant={role === "SUPER_ADMIN" ? "default" : "secondary"}>
          {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
        </Badge>
      );
    },
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    enableSorting: false,
    header: "Contact",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.contactNumber || "N/A"}</span>
    ),
  },
  {
    id: "status",
    accessorKey: "user.status",
    enableSorting: false,
    header: "Status",
    cell: ({ row }) => {
      const status = (row.original.user?.status ?? UserStatus.ACTIVE) as UserStatus;
      return <StatusBadgeCell status={status} />;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];
