import { TAppointment } from "./appointment.types";
import { TDoctor } from "./doctor.types";

export type TReview = {
  id: string;
  rating: number;
  comment: string;
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
    profilePhoto?: string;
  };
};

export type TCreateReviewPayload = {
  appointmentId: string;
  rating: number;
  comment: string;
};
