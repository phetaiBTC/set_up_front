<script setup lang="ts">
import type { User } from '../schemas/user.dto'

const props = defineProps<{
  item: User
}>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
    
    <div class="text-sm text-gray-500 mb-4">
      <p>ID: {{ item.id }}</p>
      <p>Created: {{ new Date(item.createdAt).toLocaleDateString() }}</p>
    </div>

    <div class="flex gap-2">
      <button 
        @click="emit('edit', item.id)"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button 
        @click="emit('delete', item.id)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>
