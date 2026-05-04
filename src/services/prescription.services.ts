"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TCreatePrescriptionPayload,
  TPrescription,
} from "@/types/prescription.types";

export const createPrescription = async (
  payload: TCreatePrescriptionPayload,
) => {
  try {
    return await httpClient.post<TPrescription>("/prescriptions", payload);
  } catch (error) {
    console.log("Error creating prescription:", error);
    throw error;
  }
};

export const getMyPrescriptions = async () => {
  try {
    return await httpClient.get<TPrescription[]>("/prescriptions/my-prescriptions");
  } catch (error) {
    console.log("Error fetching prescriptions:", error);
    throw error;
  }
};

export const getAllPrescriptions = async () => {
  try {
    return await httpClient.get<TPrescription[]>("/prescriptions");
  } catch (error) {
    console.log("Error fetching all prescriptions:", error);
    throw error;
  }
};
