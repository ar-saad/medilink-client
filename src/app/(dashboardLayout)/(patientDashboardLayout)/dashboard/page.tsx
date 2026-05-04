import PatientDashboardContent from "@/components/modules/Dashboard/PatientDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { IPatientDashboardData } from "@/types/dashboard.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PatientDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["patient-dashboard-data"],
    queryFn: () => getDashboardData<IPatientDashboardData>(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PatientDashboardContent />
    </HydrationBoundary>
  );
};

export default PatientDashboardPage;
