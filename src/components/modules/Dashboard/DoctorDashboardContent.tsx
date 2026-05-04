"use client";

import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IDoctorDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const DoctorDashboardContent = () => {
  const { data: dashboardResponse, isLoading } = useQuery({
    queryKey: ["doctor-dashboard-data"],
    queryFn: () => getDashboardData<IDoctorDashboardData>(),
  });

  const data = dashboardResponse?.data;

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl bg-muted" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome back, Dr. {data?.doctorName}</h2>
        <p className="text-muted-foreground">Here's an overview of your practice today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Appointments"
          value={data?.appointmentCount || 0}
          iconName="Calendar"
          description="Total bookings made"
        />
        <StatsCard
          title="Unique Patients"
          value={data?.patientCount || 0}
          iconName="Users"
          description="Patients consulted"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${data?.totalRevenue?.toFixed(2) || 0}`}
          iconName="CreditCard"
          description="Earnings from appointments"
        />
        <StatsCard
          title="Total Reviews"
          value={data?.reviewCount || 0}
          iconName="Star"
          description="Feedback from patients"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-6">Appointment Status</h3>
          <AppointmentPieChart data={data?.appointmentStatusDistribution || []} />
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
           <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <StatsCard title="" value={""} iconName="Activity" description="" className="border-none shadow-none p-0 bg-transparent" />
           </div>
           <div>
             <p className="font-medium">Performance Metrics</p>
             <p className="text-sm text-muted-foreground">Keep up the great work! Your patient satisfaction rate is high.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardContent;
