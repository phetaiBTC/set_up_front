<script setup lang="ts">
import type { CreateUserDto } from '../schemas/user.dto'

const props = defineProps<{
  initialData?: Partial<CreateUserDto>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: CreateUserDto]
  cancel: []
}>()

const formData = reactive<CreateUserDto>({
  name: props.initialData?.name || '',
})

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">
        Name
      </label>
      <input
        v-model="formData.name"
        type="text"
        required
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex gap-2">
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
