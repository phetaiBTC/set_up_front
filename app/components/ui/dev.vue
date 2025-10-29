<template>
    <div v-animateonscroll="{
        enterClass:
            'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000',
        leaveClass: 'animate-leave fade-out-0',
    }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>