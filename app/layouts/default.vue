<template>
  <div class="flex">
    <!-- Sidebar -->
    <div class="hidden md:block h-screen border sticky top-0">
      <LayoutSidebar />
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col h-screen overflow-auto">
      <LayoutHeader />
      <div class="flex-1 min-h-full border">
        <p v-for="i in 50" :key="i">Content row {{ i }}</p>
      </div>
      <LayoutFooter />
    </div>
  </div>
</template>
