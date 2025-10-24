<script setup lang="ts">
import type { User } from '../schemas/user.dto'
import UserCard from './UserCard.vue'

defineProps<{
  items: User[]
}>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div>
    <div v-if="items.length === 0" class="text-center py-8 text-gray-500">
      No items found
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UserCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>
