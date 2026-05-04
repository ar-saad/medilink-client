"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { TDashboardData } from "@/types/dashboard.types";

export async function getDashboardData<T = TDashboardData>() {
  try {
    const response = await httpClient.get<T>("/statistics");

    return response;
  } catch (error: any) {
    console.log("Error in Dashboard Server Action:", error);
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching dashboard data.",
      data: null,
      meta: null,
    };
  }
}
