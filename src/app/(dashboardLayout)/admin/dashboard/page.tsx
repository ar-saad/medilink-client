import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000, // 30 seconds - data will be considered fresh for this duration, and won't be refetched
    gcTime: 5 * 60 * 1000, // 5 minutes - data will be garbage collected after this duration if not used
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["admin-dashboard-data"],
  //   queryFn: getDashboardData,
  //   staleTime: 5 * 1000, // 5 seconds - data will be considered fresh for this duration, and won't be refetched
  //   gcTime: 10 * 1000, // 10 seconds - data will be garbage collected after this duration if not used
  // });

  // const dashboardData = queryClient.getQueryData([
  //   "admin-dashboard-data",
  // ]) as ApiResponse<IAdminDashboardData>;

  // console.log(dashboardData.data, "Dashboard Data from Page Component");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
