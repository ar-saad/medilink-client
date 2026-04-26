export type AppointmentStatus =
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED"
  | string;

export type PaymentStatus = "PAID" | "UNPAID" | "FAILED" | string;

export type TAppointmentDoctor = {
  id?: string;
  name?: string;
  email?: string;
  profilePhoto?: string;
  designation?: string;
  currentWorkingPlace?: string;
  appointmentFee?: number;
};

export type TAppointmentPatient = {
  id?: string;
  name?: string;
  email?: string;
};

export type TAppointmentSchedule = {
  id?: string;
  startDateTime?: string | Date;
  endDateTime?: string | Date;
};

export type TAppointmentPayment = {
  id?: string;
  amount?: number;
  transactionId?: string;
  status?: PaymentStatus;
  invoiceUrl?: string | null;
};

export type TAppointment = {
  id: string;
  doctorId?: string;
  patientId?: string;
  scheduleId?: string;
  videoCallingId?: string;
  status?: AppointmentStatus;
  paymentStatus?: PaymentStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  doctor?: TAppointmentDoctor | null;
  patient?: TAppointmentPatient | null;
  schedule?: TAppointmentSchedule | null;
  payment?: TAppointmentPayment | null;
};

export type TBookAppointmentPayload = {
  doctorId: string;
  scheduleId: string;
};

export type TBookAppointmentResult = {
  appointment: TAppointment;
  payment?: TAppointmentPayment;
  paymentUrl?: string | null;
};

export type TInitiatePaymentResult = {
  paymentUrl: string;
};
