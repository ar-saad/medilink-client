"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { TDoctor } from "@/types/doctor.types";

export const getDoctors = async () => {
  try {
    const doctors = await httpClient.get<TDoctor[]>("/doctors");
    return doctors;
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw error;
  }
};
