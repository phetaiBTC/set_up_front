<template>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div class="card mb-0">
      <div class="flex justify-between">
        <div>
          <span class="block text-xl font-medium mb-4">{{ $t(title) }}</span>
          <span class="text-primary text-xl font-medium mr-2">{{ count }}</span>
          <span class="text-muted-color">{{ $t(type) }}</span>
        </div>
        <div
          class="flex items-center justify-center rounded-border border-2 text-primary"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i :class="icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
  type: string;
  icon: string;
}>();
</script>
