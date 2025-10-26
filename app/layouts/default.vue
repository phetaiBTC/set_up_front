<template>
  <div class="flex">
    <!-- Mobile sidebar -->
    <Drawer v-model:visible="visible">
      <template #container>
        <LayoutSidebar />
      </template>
    </Drawer>

    <!-- Sidebar -->
    <div
      class="hidden md:block h-screen border sticky top-FAVORITES0 min-w-1/5"
    >
      <div class="card flex justify-center h-full">
        <LayoutSidebar />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col h-screen overflow-auto">
      <LayoutHeader v-model:visible="visible" />
      <div class="flex-1 p-4">
        <!-- <p v-for="i in 2" :key="i">Content row {{ i }}</p> -->
        <slot />
      </div>
      <LayoutFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
const visible = ref(false);
</script>
