<template>
  <div class="grid grid-cols-12 gap-8">
    <stats title="users" :count="24" type="people">
      <div
        class="flex items-center justify-center rounded-border bg-blue-100 dark:bg-blue-400/10 text-blue-500"
        style="width: 2.5rem; height: 2.5rem"
      >
        <i class="pi pi-users text-xl"></i>
      </div>
    </stats>

    <div class="col-span-12 xl:col-span-6"></div>
    <div class="col-span-12 xl:col-span-6"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
