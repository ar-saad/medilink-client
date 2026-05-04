import { UserStatus } from "@/types/doctor.types";

export type TAdminUserDetails = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  status?: UserStatus;
  emailVerified?: boolean;
  image?: string | null;
  isDeleted?: boolean;
  deletedAt?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type TAdmin = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  isDeleted: boolean;
  deletedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
  user: TAdminUserDetails;
};

export type TCreateAdminPayload = {
  password: string;
  admin: {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
  };
};

export type TUpdateAdminPayload = {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
};

export type TChangeUserStatusPayload = {
  userId: string;
  status: UserStatus;
};
