<template>
  <footer
    class="w-full p-6 bg-linear-to-r from-surface-600 via-surface-500 to-surface-400 dark:from-surface-900 dark:via-surface-800 dark:to-surface-700 text-white">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

      <!-- Left: Logo / Text -->
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold">🚀 YourCompany</span>
        <span class="text-sm hidden md:inline">© 2025 All rights reserved.</span>
      </div>

      <!-- Center: Links -->
      <div class="flex gap-6">
        <a href="#" class="hover:text-yellow-300 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-yellow-300 transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-yellow-300 transition-colors">Support</a>
      </div>

      <!-- Right: Social Icons -->
      <div class="flex gap-4">
        <a href="#" class="hover:text-yellow-300 transition-colors"><i class="pi pi-facebook"></i></a>
        <a href="#" class="hover:text-yellow-300 transition-colors"><i class="pi pi-twitter"></i></a>
        <a href="#" class="hover:text-yellow-300 transition-colors"><i class="pi pi-instagram"></i></a>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
// ไม่มี logic พิเศษ
</script>

<style scoped>
/* ถ้าอยากเพิ่ม shadow บางๆ ด้านบน */
footer {
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}
</style>
