"use server";

import { httpClient } from "@/lib/axios/httpClient";

type TDoctor = {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
};

export const getDoctors = async () => {
  const doctors = await httpClient.get<TDoctor[]>("/doctors");
  return doctors;
};
