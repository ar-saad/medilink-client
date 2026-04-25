"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TCreateDoctorPayload,
  TDoctor,
  TDoctorDetails,
  TUpdateDoctorPayload,
} from "@/types/doctor.types";
import { TSpecialty } from "@/types/specialty.types";

export const getDoctors = async (queryString: string) => {
  try {
    const doctors = await httpClient.get<TDoctor[]>(
      queryString ? `/doctors?${queryString}` : "/doctors",
    );
    return doctors;
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw error;
  }
};

export const getAllSpecialties = async () => {
  try {
    const specialties = await httpClient.get<TSpecialty[]>("/specialties");
    return specialties;
  } catch (error) {
    console.log("Error fetching specialties:", error);
    throw error;
  }
};

export const createDoctor = async (payload: TCreateDoctorPayload) => {
  try {
    const response = await httpClient.post<TDoctor>(
      "/users/create-doctor",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (
  id: string,
  payload: TUpdateDoctorPayload,
) => {
  try {
    const response = await httpClient.patch<TDoctor>(`/doctors/${id}`, payload);
    return response;
  } catch (error) {
    console.log("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/doctors/${id}`,
    );
    return response;
  } catch (error) {
    console.log("Error deleting doctor:", error);
    throw error;
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const doctor = await httpClient.get<TDoctorDetails>(`/doctors/${id}`);
    return doctor;
  } catch (error) {
    console.log("Error fetching doctor by id:", error);
    throw error;
  }
};
