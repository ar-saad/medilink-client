export type TDoctorScheduleDoctor = {
  id?: string;
  name?: string;
  email?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  };
};

export type TDoctorSchedule = {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  schedule?: {
    id: string;
    startDateTime: string | Date;
    endDateTime: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
  doctor?: TDoctorScheduleDoctor;
};

export type TCreateDoctorSchedulePayload = {
  scheduleIds: string[];
};

export type TUpdateDoctorSchedulePayload = {
  scheduleIds: Array<{
    shouldDelete: boolean;
    id: string;
  }>;
};
