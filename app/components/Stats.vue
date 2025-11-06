<template>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div class="card mb-0">
      <div class="flex justify-between">
        <div>
          <span class="block text-xl font-medium mb-4">{{ $t(title) }}</span>
          <span class="text-primary text-xl font-medium mr-2">{{ count }}</span>
          <span class="text-muted-color">{{ $t(type) }}</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
  type: string;
}>();
</script>
