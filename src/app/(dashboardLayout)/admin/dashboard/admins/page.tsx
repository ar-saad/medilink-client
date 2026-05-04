import AdminsTable from "@/components/modules/Admin/AdminsManagement/AdminsTable";
import { getAdmins } from "@/services/admin.services";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const AdminsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Admins Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage administrator accounts, status, and access for the platform.
          </p>
        </div>

        <AdminsTable />
      </section>
    </HydrationBoundary>
  );
};

export default AdminsManagementPage;
