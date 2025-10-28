import type { IPagination } from "~/shared/interface/pagination.interface";

export const defaultDataPagination: { data: []; pagination: IPagination } = {
  data: [],
  pagination: {
    total: 0,
    count: 0,
    limit: 0,
    totalPages: 0,
    currentPage: 1,
  },
};
