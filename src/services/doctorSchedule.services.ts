"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TCreateDoctorSchedulePayload,
  TDoctorSchedule,
  TUpdateDoctorSchedulePayload,
} from "@/types/doctorSchedule.types";

export const getMyDoctorSchedules = async (queryString: string) => {
  try {
    return await httpClient.get<TDoctorSchedule[]>(
      queryString
        ? `/doctor-schedules/my-doctor-schedules?${queryString}`
        : "/doctor-schedules/my-doctor-schedules",
    );
  } catch (error) {
    console.log("Error fetching doctor schedules:", error);
    throw error;
  }
};

export const createMyDoctorSchedule = async (
  payload: TCreateDoctorSchedulePayload,
) => {
  try {
    return await httpClient.post<TDoctorSchedule[]>(
      "/doctor-schedules/create-my-doctor-schedule",
      payload,
    );
  } catch (error) {
    console.log("Error creating doctor schedule:", error);
    throw error;
  }
};

export const updateMyDoctorSchedule = async (
  payload: TUpdateDoctorSchedulePayload,
) => {
  try {
    return await httpClient.patch<{ count: number }>(
      "/doctor-schedules/update-my-doctor-schedule",
      payload,
    );
  } catch (error) {
    console.log("Error updating doctor schedule:", error);
    throw error;
  }
};

export const deleteMyDoctorSchedule = async (id: string) => {
  try {
    return await httpClient.delete<null>(
      `/doctor-schedules/delete-my-doctor-schedule/${id}`,
    );
  } catch (error) {
    console.log("Error deleting doctor schedule:", error);
    throw error;
  }
};
