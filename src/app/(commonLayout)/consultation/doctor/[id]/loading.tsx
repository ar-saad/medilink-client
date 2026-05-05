import { ProfileSkeleton } from "@/components/shared/skeletons/ProfileSkeleton";

export default function DoctorsByIdPageLoading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <ProfileSkeleton />
    </div>
  );
}
