<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <p v-for="i in 90" :key="i" v-animateonscroll="{
    enterClass:
      'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000',
    leaveClass: 'animate-leave fade-out-0',
  }">
    Content row {{ i }}
  </p>
</template>

<script setup lang="ts"></script>

<style scoped></style>
