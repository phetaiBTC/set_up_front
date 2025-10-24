import { defineStore } from 'pinia'
import type { User } from '../schemas/user.dto'

export const useUserStore = defineStore('user', () => {
  // State
  const items = ref<User[]>([])
  const currentItem = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getById = computed(() => {
    return (id: string) => items.value.find(item => item.id === id)
  })

  const total = computed(() => items.value.length)

  // Actions
  function setItems(newItems: User[]) {
    items.value = newItems
  }

  function addItem(item: User) {
    items.value.push(item)
  }

  function updateItem(id: string, data: Partial<User>) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...data }
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function setCurrentItem(item: User | null) {
    currentItem.value = item
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

  function reset() {
    items.value = []
    currentItem.value = null
    loading.value = false
    error.value = null
  }

  return {
    // State
    items,
    currentItem,
    loading,
    error,
    // Getters
    getById,
    total,
    // Actions
    setItems,
    addItem,
    updateItem,
    removeItem,
    setCurrentItem,
    setLoading,
    setError,
    reset,
  }
})
