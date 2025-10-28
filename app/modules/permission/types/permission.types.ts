// Additional types for permission feature
// Add custom types here if needed

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
