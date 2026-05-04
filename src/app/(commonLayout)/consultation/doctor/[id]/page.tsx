import BookAppointmentModal from "@/components/modules/Patient/Appointments/BookAppointmentModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth.services";
import { getDoctorById } from "@/services/doctor.services";
import { TDoctorDetails } from "@/types/doctor.types";
import Link from "next/link";
import {
  ChevronLeft,
  GraduationCap,
  MapPin,
  Star,
  Briefcase,
} from "lucide-react";
import DoctorDetailsTabs from "@/components/modules/Consultation/DoctorDetailsTabs";
import RelatedDoctors from "@/components/modules/Consultation/RelatedDoctors";

const getInitials = (name?: string) => {
  if (!name) return "DR";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() ?? "")
    .join("");
};

const ConsultationDoctorByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const currentUser = await getUserInfo();

  let doctorDetails: TDoctorDetails | null = null;
  let errorMessage = "";

  try {
    const response = await getDoctorById(id);
    doctorDetails = response.data;
  } catch (error: any) {
    errorMessage =
      error?.response?.data?.message || "Failed to load doctor details";
  }

  if (!doctorDetails) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-center space-y-4">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 max-w-md mx-auto">
          <p className="text-destructive font-medium mb-4">
            {errorMessage || "Doctor not found."}
          </p>
          <Button asChild variant="outline">
            <Link href="/consultation">
              <ChevronLeft className="mr-2 size-4" />
              Back to List
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  const primarySpecialty = doctorDetails.specialties?.[0]?.specialty?.title;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-background border-b py-4">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/consultation">
              <ChevronLeft className="mr-1 size-4" />
              Back to Doctors
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/consultation"
              className="hover:text-primary transition-colors"
            >
              Consultation
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground truncate max-w-[150px]">
              {doctorDetails.name}
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Main Header Card */}
        <div className="relative overflow-hidden rounded-3xl border bg-card shadow-lg p-6 md:p-10">
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />

          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="relative group">
              <Avatar className="size-32 md:size-40 ring-4 ring-background shadow-xl">
                <AvatarImage
                  src={doctorDetails.profilePhoto}
                  alt={doctorDetails.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {getInitials(doctorDetails.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full border-4 border-background">
                <Star className="size-5 fill-current" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {doctorDetails.name}
                  </h1>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3">
                    Available
                  </Badge>
                </div>
                <p className="text-lg font-medium text-primary flex items-center gap-2">
                  <Briefcase className="size-4" />
                  {doctorDetails.designation || "Doctor"}
                </p>
              </div>

              <div className="grid gap-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-primary/70" />
                  {doctorDetails.qualification || "Medical Specialist"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary/70" />
                  {doctorDetails.currentWorkingPlace || "Health Center"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 py-2">
                {(doctorDetails.specialties ?? []).map((item) => (
                  <Badge
                    key={item.specialty.id}
                    variant="secondary"
                    className="px-3 py-1 bg-primary/5 text-primary hover:bg-primary/10 transition-colors border-none font-medium"
                  >
                    {item.specialty.title}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {doctorDetails.experience ?? 0}+
                  </p>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Years Exp.
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {doctorDetails.averageRating?.toFixed(1) ?? "5.0"}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Rating
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">
                    ${doctorDetails.appointmentFee?.toFixed(2) ?? "0.00"}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Fees
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto md:min-w-[240px] space-y-3 pt-4 md:pt-0">
              <BookAppointmentModal
                doctorId={String(doctorDetails.id)}
                doctorName={doctorDetails.name}
                isAuthenticated={Boolean(currentUser)}
                viewerRole={currentUser?.role ?? null}
                fullWidth
              />
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl group"
                asChild
              >
                <a href={`mailto:${doctorDetails.email}`}>Contact Doctor</a>
              </Button>
              <p className="text-[11px] text-center text-muted-foreground px-4">
                Bookings are secure and encrypted. Need help?{" "}
                <Link href="/contact" className="underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Details and Tabs */}
        <div className="rounded-3xl border bg-card p-6 md:p-10 shadow-sm">
          <DoctorDetailsTabs doctor={doctorDetails} />
        </div>

        {/* Related Doctors */}
        <div className="pt-8">
          <RelatedDoctors
            specialtyTitle={primarySpecialty}
            currentDoctorId={doctorDetails.id}
          />
        </div>
      </section>
    </div>
  );
};

export default ConsultationDoctorByIdPage;
