"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  TAdmin,
  TChangeUserStatusPayload,
  TCreateAdminPayload,
  TUpdateAdminPayload,
} from "@/types/admin.types";

export const getAdmins = async () => {
  try {
    return await httpClient.get<TAdmin[]>("/admins");
  } catch (error) {
    console.log("Error fetching admins:", error);
    throw error;
  }
};

export const getAdminById = async (id: string) => {
  try {
    return await httpClient.get<TAdmin>(`/admins/${id}`);
  } catch (error) {
    console.log("Error fetching admin by id:", error);
    throw error;
  }
};

export const createAdmin = async (payload: TCreateAdminPayload) => {
  try {
    return await httpClient.post<TAdmin>("/users/create-admin", payload);
  } catch (error) {
    console.log("Error creating admin:", error);
    throw error;
  }
};

export const updateAdmin = async (id: string, payload: TUpdateAdminPayload) => {
  try {
    return await httpClient.patch<TAdmin>(`/admins/${id}`, payload);
  } catch (error) {
    console.log("Error updating admin:", error);
    throw error;
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    return await httpClient.delete<TAdmin>(`/admins/${id}`);
  } catch (error) {
    console.log("Error deleting admin:", error);
    throw error;
  }
};

export const changeUserStatus = async (payload: TChangeUserStatusPayload) => {
  try {
    return await httpClient.patch<TAdmin>(
      "/admins/change-user-status",
      payload,
    );
  } catch (error) {
    console.log("Error changing user status:", error);
    throw error;
  }
};
