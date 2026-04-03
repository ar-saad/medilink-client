import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDoctors } from "./_actions";
import DoctorList from "@/components/modules/Consultation/DoctorList";

const ConsultationPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DoctorList />
      </HydrationBoundary>
    </div>
  );
};

export default ConsultationPage;
