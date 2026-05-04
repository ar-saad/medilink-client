"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getMyPrescriptions } from "@/services/prescription.services";
import { useQuery } from "@tanstack/react-query";
import { doctorPrescriptionsColumns } from "./doctorPrescriptionsColumns";

const DoctorPrescriptionsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["doctor-prescriptions"],
    queryFn: () => getMyPrescriptions(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Prescriptions</h2>
          <p className="text-muted-foreground">
            A history of all prescriptions you have issued to patients.
          </p>
        </div>
      </div>

      <DataTable
        columns={doctorPrescriptionsColumns}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorPrescriptionsTable;
