"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { changeAppointmentStatus, getMyAppointments } from "@/services/appointment.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { doctorAppointmentsColumns } from "./doctorAppointmentsColumns";
import CreatePrescriptionModal from "./CreatePrescriptionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DoctorAppointmentsTable = () => {
  const [prescriptionAppointmentId, setPrescriptionAppointmentId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: () => getMyAppointments(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      changeAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      toast.success("Appointment status updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const columnsWithActions = [
    ...doctorAppointmentsColumns,
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: any }) => {
        const appointment = row.original;
        const canPrescribe = appointment.status === "INPROGRESS" || appointment.status === "COMPLETED";
        
        const isUpdating = statusMutation.isPending && statusMutation.variables?.id === appointment.id;
        
        return (
          <div className="flex items-center justify-end gap-2 min-w-[150px]">
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            
            {canPrescribe && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrescriptionAppointmentId(appointment.id)}
                disabled={isUpdating}
              >
                <FileText className="mr-2 h-4 w-4" />
                Prescribe
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => statusMutation.mutate({ id: appointment.id, status: "INPROGRESS" })}
                  disabled={appointment.status !== "SCHEDULED" || isUpdating}
                >
                  Mark as In-Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => statusMutation.mutate({ id: appointment.id, status: "COMPLETED" })}
                  disabled={appointment.status === "COMPLETED" || appointment.status === "CANCELED" || isUpdating}
                >
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => statusMutation.mutate({ id: appointment.id, status: "CANCELED" })}
                  disabled={appointment.status === "COMPLETED" || appointment.status === "CANCELED" || isUpdating}
                >
                  Cancel Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">
            View and manage your patient consultations.
          </p>
        </div>
      </div>

      <DataTable
        columns={columnsWithActions}
        data={data?.data || []}
        isLoading={isLoading}
      />

      <CreatePrescriptionModal
        appointmentId={prescriptionAppointmentId}
        open={!!prescriptionAppointmentId}
        onOpenChange={(open) => !open && setPrescriptionAppointmentId(null)}
      />
    </div>
  );
};

export default DoctorAppointmentsTable;
