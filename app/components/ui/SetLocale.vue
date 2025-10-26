<template>
  <SelectButton
    v-model="value"
    :options="options"
    @change="setLocale(value)"
    optionLabel="label"
    optionValue="value"
  />
</template>

<script setup lang="ts">
const { setLocale } = useI18n();
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
