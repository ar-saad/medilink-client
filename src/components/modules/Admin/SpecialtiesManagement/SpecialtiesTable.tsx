"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { getSpecialties } from "@/services/specialty.services";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import CreateSpecialtyFormModal from "./CreateSpecialtyFormModal";
import DeleteSpecialtyConfirmationDialog from "./DeleteSpecialtyConfirmationDialog";
import UpdateSpecialtyFormModal from "./UpdateSpecialtyFormModal";
import { specialtiesColumns } from "./specialtiesColumns";
import { TSpecialty } from "@/types/specialty.types";

const SpecialtiesTable = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingSpecialty, setEditingSpecialty] = useState<TSpecialty | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => getSpecialties(),
  });

  const columnsWithActions = [
    ...specialtiesColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => setEditingSpecialty(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Specialties</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Specialty
        </Button>
      </div>

      <DataTable
        columns={columnsWithActions}
        data={data?.data || []}
        isLoading={isLoading}
      />

      <CreateSpecialtyFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      <UpdateSpecialtyFormModal
        specialty={editingSpecialty}
        open={!!editingSpecialty}
        onOpenChange={(open) => !open && setEditingSpecialty(null)}
      />

      {deleteId && (
        <DeleteSpecialtyConfirmationDialog
          id={deleteId}
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default SpecialtiesTable;
