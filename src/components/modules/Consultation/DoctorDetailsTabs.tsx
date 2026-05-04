"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TDoctorDetails } from "@/types/doctor.types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DoctorDetailsTabsProps {
  doctor: TDoctorDetails;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.getTime())) return "N/A";
  return format(dateValue, "MMM dd, yyyy hh:mm a");
};

const DoctorDetailsTabs = ({ doctor }: DoctorDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "schedules" | "reviews">("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedules", label: "Schedules" },
    { id: "reviews", label: "Reviews", count: doctor.reviews?.length },
  ];

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const availableSchedules = (doctor.doctorSchedules ?? [])
    .filter((item) => {
      if (item.isBooked || !item.schedule?.startDateTime) return false;
      return new Date(item.schedule.startDateTime) >= todayStart;
    })
    .sort((a, b) => new Date(a.schedule?.startDateTime ?? 0).getTime() - new Date(b.schedule?.startDateTime ?? 0).getTime());

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Professional Background</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Qualification</span>
                  <span className="font-medium text-right">{doctor.qualification || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{doctor.experience ?? 0} Years</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Registration No</span>
                  <span className="font-medium">{doctor.registrationNumber || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Working Place</span>
                  <span className="font-medium text-right">{doctor.currentWorkingPlace || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Practice Information</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-medium text-primary text-lg">${doctor.appointmentFee?.toFixed(2) ?? "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Gender</span>
                  <span className="font-medium">{doctor.gender || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Contact Email</span>
                  <span className="font-medium">{doctor.email || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedules" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-lg">Available Schedules</h3>
              <Badge variant="outline">Next 7 Days</Badge>
            </div>
            {availableSchedules.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {availableSchedules.slice(0, 12).map((item, index) => (
                  <div
                    key={item.id ?? `schedule-${index}`}
                    className="rounded-xl border p-4 hover:border-primary/50 transition-colors bg-muted/5"
                  >
                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1">Available Slot</p>
                    <p className="text-sm font-semibold">
                      {format(new Date(item.schedule?.startDateTime!), "EEEE, MMM dd")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(item.schedule?.startDateTime!), "hh:mm a")} - {format(new Date(item.schedule?.endDateTime!), "hh:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border rounded-xl bg-muted/10">
                <p className="text-muted-foreground">No upcoming slots available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Patient Feedback</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow-500">{doctor.averageRating?.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">out of 5.0</span>
              </div>
            </div>
            {doctor.reviews && doctor.reviews.length > 0 ? (
              <div className="grid gap-4">
                {doctor.reviews.map((review, index) => (
                  <div key={review.id ?? `review-${index}`} className="rounded-xl border p-5 space-y-3 bg-card shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={cn("size-4", i < (review.rating ?? 0) ? "text-yellow-500 fill-yellow-500" : "text-muted fill-muted")}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDateTime(review.createdAt)}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{review.comment || "No comment provided."}</p>
                    <p className="text-xs text-muted-foreground font-medium italic">Verified Patient</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border rounded-xl bg-muted/10">
                <p className="text-muted-foreground">No reviews yet for this doctor.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailsTabs;
