"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Calendar, Clock, User, ArrowRight, Home, CreditCard } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getMySingleAppointment } from "@/services/appointment.services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");

  const { data: appointment, isLoading, isError } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getMySingleAppointment(appointmentId as string),
    enabled: !!appointmentId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-4 bg-red-100 rounded-full">
          <CreditCard className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Confirmation Pending</h1>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't retrieve your appointment details right now, but your payment might still be processing. 
          Please check your dashboard in a few minutes.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/appointments">Go to Appointments</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { doctor, schedule, status } = appointment.data;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4 animate-bounce">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Your appointment has been confirmed. A confirmation email with the invoice has been sent to your email address.
        </p>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-white/80 backdrop-blur-md">
        <div className="h-2 bg-green-500 w-full" />
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Appointment Details</CardTitle>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              Confirmed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Doctor</p>
                <p className="text-lg font-semibold text-gray-900">{doctor?.name || "N/A"}</p>
                <p className="text-sm text-gray-600">{doctor?.designation || "Specialist"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {schedule?.startDateTime ? format(new Date(schedule.startDateTime), "MMMM dd, yyyy") : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {schedule?.startDateTime ? format(new Date(schedule.startDateTime), "EEEE") : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 md:col-span-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Time Slot</p>
                <p className="text-lg font-semibold text-gray-900">
                  {schedule?.startDateTime ? format(new Date(schedule.startDateTime), "hh:mm a") : "N/A"} - {schedule?.endDateTime ? format(new Date(schedule.endDateTime), "hh:mm a") : "N/A"}
                </p>
                <p className="text-sm text-gray-600">Please arrive 10 minutes early</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center text-gray-600 mb-2">
              <span>Appointment ID</span>
              <span className="font-mono text-sm">{appointmentId}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Status</span>
              <span className="capitalize">{status?.toLowerCase() || "scheduled"}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex flex-col sm:flex-row gap-4 p-6">
          <Button asChild variant="outline" className="flex-1 h-12 text-base">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </Link>
          </Button>
          <Button asChild className="flex-1 h-12 text-base bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard/appointments">
              View My Appointments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-8 text-center text-sm text-gray-500">
        Having trouble? <Link href="/contact" className="text-blue-600 hover:underline">Contact our support team</Link>
      </p>
    </div>
  );
};

export default PaymentSuccess;
