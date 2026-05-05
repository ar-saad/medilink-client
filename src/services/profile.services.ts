"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { UserInfo } from "@/types/user.types";
import { revalidateTag } from "next/cache";

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
    const result = await httpClient.patch<any>("/patients/my-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("user", "max");
    return result;
  } catch (error) {
    console.log("Error updating patient profile:", error);
    throw error;
  }
};

export const updateDoctorProfile = async (id: string, formData: FormData) => {
  try {
    const result = await httpClient.patch<any>(`/doctors/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("user", "max");
    return result;
  } catch (error) {
    console.log("Error updating doctor profile:", error);
    throw error;
  }
};

export const updateAdminProfile = async (id: string, formData: FormData) => {
  try {
    const result = await httpClient.patch<any>(`/admins/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("user", "max");
    return result;
  } catch (error) {
    console.log("Error updating admin profile:", error);
    throw error;
  }
};
