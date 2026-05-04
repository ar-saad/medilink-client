"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TAppointment,
  TBookAppointmentPayload,
  TBookAppointmentResult,
  TInitiatePaymentResult,
} from "@/types/appointment.types";

export const bookAppointment = async (payload: TBookAppointmentPayload) => {
  try {
    return await httpClient.post<TBookAppointmentResult>(
      "/appointments/book-appointment",
      payload,
    );
  } catch (error) {
    console.log("Error booking appointment:", error);
    throw error;
  }
};

export const bookAppointmentWithPayLater = async (
  payload: TBookAppointmentPayload,
) => {
  try {
    return await httpClient.post<TBookAppointmentResult>(
      "/appointments/book-appointment-with-pay-later",
      payload,
    );
  } catch (error) {
    console.log("Error booking appointment with pay later:", error);
    throw error;
  }
};

export const initiateAppointmentPayment = async (appointmentId: string) => {
  try {
    return await httpClient.post<TInitiatePaymentResult>(
      `/appointments/initiate-payment/${appointmentId}`,
      {},
    );
  } catch (error) {
    console.log("Error initiating appointment payment:", error);
    throw error;
  }
};

export const getMyAppointments = async () => {
  try {
    return await httpClient.get<TAppointment[]>(
      "/appointments/my-appointments",
    );
  } catch (error) {
    console.log("Error fetching my appointments:", error);
    throw error;
  }
};

export const getMySingleAppointment = async (appointmentId: string) => {
  try {
    return await httpClient.get<TAppointment>(
      `/appointments/my-single-appointment/${appointmentId}`,
    );
  } catch (error) {
    console.log("Error fetching appointment details:", error);
    throw error;
  }
};

export const changeAppointmentStatus = async (
  appointmentId: string,
  status: string,
) => {
  try {
    return await httpClient.patch<TAppointment>(
      `/appointments/change-appointment-status/${appointmentId}`,
      { status },
    );
  } catch (error) {
    console.log("Error changing appointment status:", error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    return await httpClient.get<TAppointment[]>("/appointments/all-appointments");
  } catch (error) {
    console.log("Error fetching all appointments:", error);
    throw error;
  }
};
