import type { User } from '../schemas/user.dto'

/**
 * Format user display name
 */
export const formatUserName = (item: User): string => {
  return item.name
}

/**
 * Sort user items
 */
export const sortUsers = (
  items: User[],
  sortBy: 'name' | 'createdAt' = 'name',
  order: 'asc' | 'desc' = 'asc'
): User[] => {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
}

/**
 * Filter user items
 */
export const filterUsers = (
  items: User[],
  search: string
): User[] => {
  if (!search) return items
  
  const searchLower = search.toLowerCase()
  return items.filter(item =>
    item.name.toLowerCase().includes(searchLower)
  )
}
