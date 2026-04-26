"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TCreateSchedulePayload,
  TSchedule,
  TUpdateSchedulePayload,
} from "@/types/schedule.types";

export const getSchedules = async (queryString: string) => {
  try {
    return await httpClient.get<TSchedule[]>(
      queryString ? `/schedules?${queryString}` : "/schedules",
    );
  } catch (error) {
    console.log("Error fetching schedules:", error);
    throw error;
  }
};

export const createSchedule = async (payload: TCreateSchedulePayload) => {
  try {
    return await httpClient.post<TSchedule[]>("/schedules", payload);
  } catch (error) {
    console.log("Error creating schedule:", error);
    throw error;
  }
};

export const updateSchedule = async (
  id: string,
  payload: TUpdateSchedulePayload,
) => {
  try {
    return await httpClient.patch<TSchedule>(`/schedules/${id}`, payload);
  } catch (error) {
    console.log("Error updating schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    return await httpClient.delete<boolean>(`/schedules/${id}`);
  } catch (error) {
    console.log("Error deleting schedule:", error);
    throw error;
  }
};

export const getScheduleById = async (id: string) => {
  try {
    return await httpClient.get<TSchedule>(`/schedules/${id}`);
  } catch (error) {
    console.log("Error fetching schedule by id:", error);
    throw error;
  }
};
