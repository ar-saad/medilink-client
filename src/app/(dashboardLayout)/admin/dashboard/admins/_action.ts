"use server";

import {
  changeUserStatus,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from "@/services/admin.services";
import {
  TAdmin,
  TChangeUserStatusPayload,
  TCreateAdminPayload,
  TUpdateAdminPayload,
} from "@/types/admin.types";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import {
  createAdminServerZodSchema,
  updateAdminServerZodSchema,
} from "@/zod/admin.validation";

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export const createAdminAction = async (
  payload: TCreateAdminPayload,
): Promise<ApiResponse<TAdmin> | ApiErrorResponse> => {
  const parsedPayload = createAdminServerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await createAdmin(parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create admin"),
    };
  }
};

export const updateAdminAction = async (
  id: string,
  payload: TUpdateAdminPayload,
): Promise<ApiResponse<TAdmin> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  const parsedPayload = updateAdminServerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await updateAdmin(id, parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update admin"),
    };
  }
};

export const deleteAdminAction = async (
  id: string,
): Promise<ApiResponse<TAdmin> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  try {
    return await deleteAdmin(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete admin"),
    };
  }
};

export const changeAdminStatusAction = async (
  payload: TChangeUserStatusPayload,
): Promise<ApiResponse<TAdmin> | ApiErrorResponse> => {
  if (!payload.userId) {
    return {
      success: false,
      message: "Invalid user id",
    };
  }

  try {
    return await changeUserStatus(payload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change user status"),
    };
  }
};
