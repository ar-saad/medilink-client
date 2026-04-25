export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export type TDoctor = {
  id: number;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber: string;
  experience?: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  createdAt: Date;
  user: {
    status: UserStatus;
  };
  specialties: Array<{
    specialtyId: string;
    doctorId: string;
    specialty: {
      id: string;
      title: string;
      icon: string;
    };
  }>;
};

export type TCreateDoctorPayload = {
  password: string;
  doctor: {
    name: string;
    email: string;
    contactNumber: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender: Gender.MALE | Gender.FEMALE;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
  };
  specialties: string[];
};

export type TUpdateDoctorSpecialtyChange = {
  specialtyId: string;
  shouldDelete?: boolean;
};

export type TUpdateDoctorPayload = {
  doctor?: {
    name?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber?: string;
    experience?: number;
    gender?: Gender.MALE | Gender.FEMALE;
    appointmentFee?: number;
    qualification?: string;
    currentWorkingPlace?: string;
    designation?: string;
  };
  specialties?: TUpdateDoctorSpecialtyChange[];
};

export type TDoctorUserDetails = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  image?: string;
  isDeleted?: boolean;
  deletedAt?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type TDoctorReview = {
  id?: string;
  rating?: number;
  comment?: string;
  patientId?: string;
  createdAt?: string | Date;
};

export type TDoctorScheduleItem = {
  id?: string;
  isBooked?: boolean;
  schedule?: {
    id?: string;
    startDateTime?: string | Date;
    endDateTime?: string | Date;
  };
};

export type TDoctorAppointmentItem = {
  id?: string;
  status?: string;
  createdAt?: string | Date;
  patient?: {
    id?: string;
    name?: string;
    email?: string;
  };
  schedule?: {
    id?: string;
    startDateTime?: string | Date;
    endDateTime?: string | Date;
  };
  prescription?: {
    id?: string;
  } | null;
};

export type TDoctorDetails = TDoctor & {
  user: TDoctorUserDetails;
  appointments?: TDoctorAppointmentItem[];
  doctorSchedules?: TDoctorScheduleItem[];
  reviews?: TDoctorReview[];
};
