import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";
import { Suspense } from "react";

export const metadata = {
  title: "Payment Success | MediLink",
  description: "Your appointment has been successfully booked.",
};

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      }>
        <PaymentSuccess />
      </Suspense>
    </div>
  );
};

export default PaymentSuccessPage;
