export enum GetType {
  ALL = "all",
  PAGE = "page",
}
export enum sortType {
  ASC = "ASC",
  DESC = "DESC",
}
export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export interface PaginationDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: GetType;
  sort?: sortType;
  is_active?: Status;
}
