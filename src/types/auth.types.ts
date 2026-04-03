export type TLoginResponse = {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role: string;
    status: string;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt?: Date | null | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
};
