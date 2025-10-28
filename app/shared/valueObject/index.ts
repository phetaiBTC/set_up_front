import { GetType, sortType, Status } from "~/shared/dto/pagination.dto";

export const defaultQuery = {
  page: 1,
  limit: 10,
  search: "",
  is_active: Status.ACTIVE,
  sort: sortType.ASC,
  type: GetType.PAGE,
};
