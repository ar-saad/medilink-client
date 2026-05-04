"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { UserInfo } from "@/types/user.types";

export const getMyProfile = async () => {
  try {
    return await httpClient.get<any>("/auth/me");
  } catch (error) {
    console.log("Error fetching profile:", error);
    throw error;
  }
};

export const updatePatientProfile = async (formData: FormData) => {
  try {
    return await httpClient.patch<any>("/patients/my-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error updating patient profile:", error);
    throw error;
  }
};

export const updateDoctorProfile = async (id: string, payload: any) => {
  try {
    return await httpClient.patch<any>(`/doctors/${id}`, payload);
  } catch (error) {
    console.log("Error updating doctor profile:", error);
    throw error;
  }
};

export const updateAdminProfile = async (id: string, payload: any) => {
  try {
    return await httpClient.patch<any>(`/admins/${id}`, payload);
  } catch (error) {
    console.log("Error updating admin profile:", error);
    throw error;
  }
};
