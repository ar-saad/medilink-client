"use client";

import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { IPatientDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const PatientDashboardContent = () => {
  const { data: dashboardResponse, isLoading } = useQuery({
    queryKey: ["patient-dashboard-data"],
    queryFn: () => getDashboardData<IPatientDashboardData>(),
  });

  const data = dashboardResponse?.data;

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl bg-muted" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Hello, {data?.patientName}</h2>
        <p className="text-muted-foreground">Manage your health and upcoming appointments here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          title="My Appointments"
          value={data?.appointmentCount || 0}
          iconName="Calendar"
          description="Total sessions booked"
        />
        <StatsCard
          title="Total Reviews"
          value={data?.reviewCount || 0}
          iconName="Star"
          description="Feedback you've shared"
        />
        <StatsCard
          title="Health Records"
          value={0}
          iconName="FileText"
          description="Uploaded documents"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-6">Appointment Status</h3>
          <AppointmentPieChart data={data?.appointmentStatusDistribution || []} />
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
           <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
           </div>
           <div>
             <p className="font-medium">Stay Healthy</p>
             <p className="text-sm text-muted-foreground">Regular checkups are key to a long and healthy life. Book your next consultation today!</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardContent;
