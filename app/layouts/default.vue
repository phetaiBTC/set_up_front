<template>
  <div class="flex w-full h-screen overflow-hidden">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <!-- <ConfirmPopup></ConfirmPopup> -->
    <!-- Mobile sidebar -->

    <Drawer v-model:visible="visible">
      <template #container>
        <LayoutSidebar />
      </template>
    </Drawer>

    <!-- Sidebar -->
    <div class="hidden md:block min-w-1/5 h-full sticky top-0">
      <div class="card flex justify-center h-full">
        <LayoutSidebar />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col h-full border-l border-surface-200 overflow-y-auto">
      <LayoutHeader v-model:visible="visible" />
      <section class="flex-1 p-4">
        <NuxtPage />
      </section>
      <LayoutFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
const visible = ref(false);
</script>
