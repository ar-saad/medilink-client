export type ApiResponse<TData = unknown> = {
  success: boolean;
  message: string;
  data: TData;
  meta?: PaginationMeta;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiErrorResponse = {
  success: boolean;
  message: string;
};
