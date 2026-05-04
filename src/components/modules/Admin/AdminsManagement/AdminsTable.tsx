"use client";

import { changeAdminStatusAction } from "@/app/(dashboardLayout)/admin/dashboard/admins/_action";
import DataTable from "@/components/shared/table/DataTable";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { getAdmins } from "@/services/admin.services";
import { TAdmin } from "@/types/admin.types";
import { PaginationMeta } from "@/types/api.types";
import { UserStatus } from "@/types/doctor.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { Ban, CheckCircle2, MoreHorizontal } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { adminsColumns } from "./adminsColumns";
import CreateAdminFormModal from "./CreateAdminFormModal";
import DeleteAdminConfirmationDialog from "./DeleteAdminConfirmationDialog";
import EditAdminFormModal from "./EditAdminFormModal";

const DEFAULT_PAGE_SIZE = 10;

const ROLE_FILTER_KEY = "user.role";
const STATUS_FILTER_KEY = "user.status";

const matchesSearch = (admin: TAdmin, term: string) => {
  if (!term) {
    return true;
  }

  const lowered = term.toLowerCase();
  return (
    admin.name.toLowerCase().includes(lowered) ||
    admin.email.toLowerCase().includes(lowered) ||
    (admin.contactNumber ?? "").toLowerCase().includes(lowered)
  );
};

const compareValues = (left: unknown, right: unknown): number => {
  if (left === right) {
    return 0;
  }

  if (left == null) {
    return -1;
  }

  if (right == null) {
    return 1;
  }

  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() - right.getTime();
  }

  return String(left).localeCompare(String(right));
};

const getSortValue = (admin: TAdmin, field: string): unknown => {
  switch (field) {
    case "name":
      return admin.name;
    case "createdAt":
      return new Date(admin.createdAt);
    default:
      return admin.name;
  }
};

const AdminsTable = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<DataTableFilterValues>({});
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const {
    editingItem,
    deletingItem,
    isEditModalOpen,
    isDeleteDialogOpen,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<TAdmin>({ enableView: false });

  const { data: adminsResponse, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(),
    staleTime: 1000 * 60,
  });

  const admins = adminsResponse?.data ?? [];

  const { mutateAsync: changeStatus, isPending: isChangingStatus } = useMutation({
    mutationFn: changeAdminStatusAction,
  });

  const handleChangeStatus = useCallback(
    async (admin: TAdmin, nextStatus: UserStatus) => {
      if (!admin.userId) {
        toast.error("User reference is missing for this admin");
        return;
      }

      const result = await changeStatus({
        userId: admin.userId,
        status: nextStatus,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update admin status");
        return;
      }

      toast.success(
        nextStatus === UserStatus.ACTIVE
          ? "Admin activated"
          : "Admin blocked",
      );

      void queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    [changeStatus, queryClient],
  );

  const filteredAdmins = useMemo(() => {
    const roleFilter = filterValues[ROLE_FILTER_KEY];
    const statusFilter = filterValues[STATUS_FILTER_KEY];

    return admins.filter((admin) => {
      if (!matchesSearch(admin, searchTerm)) {
        return false;
      }

      if (typeof roleFilter === "string" && roleFilter.length > 0) {
        if ((admin.user?.role ?? "") !== roleFilter) {
          return false;
        }
      }

      if (typeof statusFilter === "string" && statusFilter.length > 0) {
        if ((admin.user?.status ?? "") !== statusFilter) {
          return false;
        }
      }

      return true;
    });
  }, [admins, filterValues, searchTerm]);

  const sortedAdmins = useMemo(() => {
    if (sortingState.length === 0) {
      return filteredAdmins;
    }

    const sortConfig = sortingState[0];
    const sorted = [...filteredAdmins].sort((a, b) => {
      const result = compareValues(
        getSortValue(a, sortConfig.id),
        getSortValue(b, sortConfig.id),
      );
      return sortConfig.desc ? -result : result;
    });

    return sorted;
  }, [filteredAdmins, sortingState]);

  const totalFiltered = sortedAdmins.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalFiltered / paginationState.pageSize),
  );

  const pagedAdmins = useMemo(() => {
    const start = paginationState.pageIndex * paginationState.pageSize;
    const end = start + paginationState.pageSize;
    return sortedAdmins.slice(start, end);
  }, [sortedAdmins, paginationState]);

  const meta: PaginationMeta = useMemo(
    () => ({
      page: paginationState.pageIndex + 1,
      limit: paginationState.pageSize,
      total: totalFiltered,
      totalPages,
    }),
    [paginationState, totalFiltered, totalPages],
  );

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: ROLE_FILTER_KEY,
        label: "Role",
        type: "single-select",
        options: [
          { label: "Admin", value: "ADMIN" },
          { label: "Super Admin", value: "SUPER_ADMIN" },
        ],
      },
      {
        id: STATUS_FILTER_KEY,
        label: "Status",
        type: "single-select",
        options: [
          { label: "Active", value: UserStatus.ACTIVE },
          { label: "Blocked", value: UserStatus.BLOCKED },
        ],
      },
    ];
  }, []);

  const handleFilterChange = useCallback(
    (filterId: string, value: unknown) => {
      setFilterValues((prev) => {
        const next = { ...prev };
        if (value === undefined || value === null || value === "") {
          delete next[filterId];
        } else {
          next[filterId] = value as DataTableFilterValues[string];
        }
        return next;
      });
      setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilterValues({});
    setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const handleDebouncedSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const columnsWithStatusToggle = useMemo<ColumnDef<TAdmin>[]>(() => {
    return [
      ...adminsColumns,
      {
        id: "statusActions",
        header: "Status Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const admin = row.original;
          const currentStatus = admin.user?.status as UserStatus | undefined;
          const isActive = currentStatus === UserStatus.ACTIVE;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={isChangingStatus}
                >
                  <span className="sr-only">Status actions</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={isActive}
                  onClick={() =>
                    void handleChangeStatus(admin, UserStatus.ACTIVE)
                  }
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Activate
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!isActive}
                  onClick={() =>
                    void handleChangeStatus(admin, UserStatus.BLOCKED)
                  }
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Block
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [handleChangeStatus, isChangingStatus]);

  return (
    <>
      <DataTable
        data={pagedAdmins}
        columns={columnsWithStatusToggle}
        isLoading={isLoading}
        emptyMessage="No admins found."
        sorting={{
          state: sortingState,
          onSortingChange: setSortingState,
        }}
        pagination={{
          state: paginationState,
          onPaginationChange: setPaginationState,
        }}
        search={{
          initialValue: searchTerm,
          placeholder: "Search admin by name, email, contact...",
          debounceMs: 400,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: handleClearFilters,
        }}
        toolbarAction={<CreateAdminFormModal />}
        meta={meta}
        actions={tableActions}
      />

      <EditAdminFormModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        admin={editingItem}
      />

      <DeleteAdminConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        admin={deletingItem}
      />
    </>
  );
};

export default AdminsTable;
