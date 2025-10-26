<template>
  <div
    class="w-full border flex items-center px-5 py-2 justify-between sticky top-0 backdrop-blur-xl"
  >
    <div class="flex items-center gap-5">
      <!-- ปุ่มเปิดเมนูในมือถือ -->
      <div class="block md:hidden">
        <Button icon="pi pi-bars" @click="emit('update:visible', true)" />
      </div>
      <div>{{ $t("branch") }} : Phet</div>
      <div class="hidden sm:block">{{ $t("date") }} : {{ dateTime }}</div>
    </div>

    <div class="flex items-center gap-5">
      <ui-set-locale />
      <Button
        icon="pi pi-cog"
        variant="link"
        @click="emit('update:visible', true)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["update:visible"]);

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
