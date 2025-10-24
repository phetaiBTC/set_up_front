<template>
  <div class="flex flex-col gap-2">
    <SelectButton
      v-model="value"
      :options="options"
      @change="setLocale(value)"
      optionLabel="label"
      optionValue="value"
    />
    <h1 class="mt-4 text-xl font-bold">{{ $t("welcome") }}</h1>
  </div>
</template>

<script setup lang="ts">
const { locales, setLocale } = useI18n();

const options = ref([
  {
    label: "En 🇺🇸",
    value: "en",
  },
  {
    label: "La 🇱🇦",
    value: "la",
  },
]);

const value = ref<"en" | "la">("en");
</script>
