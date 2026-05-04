"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { TSpecialty } from "@/types/specialty.types";

export const getSpecialties = async () => {
  try {
    return await httpClient.get<TSpecialty[]>("/specialties");
  } catch (error) {
    console.log("Error fetching specialties:", error);
    throw error;
  }
};

export const createSpecialty = async (formData: FormData) => {
  try {
    return await httpClient.post<TSpecialty>("/specialties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error creating specialty:", error);
    throw error;
  }
};

export const deleteSpecialty = async (id: string) => {
  try {
    return await httpClient.delete<boolean>(`/specialties/${id}`);
  } catch (error) {
    console.log("Error deleting specialty:", error);
    throw error;
  }
};

export const updateSpecialty = async (id: string, formData: FormData) => {
  try {
    return await httpClient.patch<TSpecialty>(`/specialties/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error updating specialty:", error);
    throw error;
  }
};
