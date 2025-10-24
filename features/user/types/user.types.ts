
export interface UserFilters {
  search?: string
  sortBy?: 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface UserStats {
  total: number
  active: number
  inactive: number
}