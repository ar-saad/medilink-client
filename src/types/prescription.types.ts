import { TAppointment } from "./appointment.types";
import { TDoctor } from "./doctor.types";
import { TUser } from "./user.types";

export type TPrescription = {
  id: string;
  followUpDate: string;
  instructions: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  appointment?: TAppointment;
  doctor?: TDoctor;
  patient?: {
    id: string;
    name: string;
    email: string;
    user?: TUser;
  };
};

export type TCreatePrescriptionPayload = {
  appointmentId: string;
  instructions: string;
  followUpDate: string;
};
