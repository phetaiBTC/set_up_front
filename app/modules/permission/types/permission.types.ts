export interface PermissionFilters {
  search?: string
  sortBy?: 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface PermissionStats {
  total: number
  active: number
  inactive: number
}
