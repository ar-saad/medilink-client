export type TScheduleDoctorAssignment = {
  doctorId: string;
  scheduleId: string;
  isBooked?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type TScheduleAppointment = {
  id?: string;
  status?: string;
  createdAt?: string | Date;
  doctor?: {
    id?: string | number;
    name?: string;
    email?: string;
  } | null;
  patient?: {
    id?: string | number;
    name?: string;
    email?: string;
  } | null;
};

export type TSchedule = {
  id: string;
  startDateTime: string | Date;
  endDateTime: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  doctorSchedules?: TScheduleDoctorAssignment[];
  appointments?: TScheduleAppointment[];
};

export type TCreateSchedulePayload = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export type TUpdateSchedulePayload = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};
