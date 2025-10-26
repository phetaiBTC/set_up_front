<template>
  <div class="w-full border flex items-center px-5 py-2 justify-between">
    <div class="flex items-center gap-5">
      <div class="block sm:hidden">
        <Button icon="pi pi-bars" @click="visible = true" />
      </div>

      <div>{{ $t("branch") }} : Phet</div>
      <div class="hidden sm:block">{{ $t("date") }} : {{ dateTime }}</div>
    </div>
    <ui-set-locale />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
const visible = ref(false);
const dateTime = ref(dayjs().format("DD-MM-YYYY HH:mm:ss"));
let timer: number;

onMounted(() => {
  timer = window.setInterval(() => {
    dateTime.value = dayjs().format("DD-MM-YYYY HH:mm:ss");
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped></style>
