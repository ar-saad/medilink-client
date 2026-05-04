import DoctorDashboardContent from "@/components/modules/Dashboard/DoctorDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { IDoctorDashboardData } from "@/types/dashboard.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctor-dashboard-data"],
    queryFn: () => getDashboardData<IDoctorDashboardData>(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorDashboardContent />
    </HydrationBoundary>
  );
};

export default DoctorDashboardPage;
