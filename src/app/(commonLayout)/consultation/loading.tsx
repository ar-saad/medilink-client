import { DoctorListingSkeleton } from "@/components/shared/skeletons/DoctorCardSkeleton";

export default function ConsultationPageLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <DoctorListingSkeleton />
    </div>
  );
}
