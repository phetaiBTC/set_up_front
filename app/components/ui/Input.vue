<template>
  <FormField
    v-slot="$field"
    :name="name"
    class="flex flex-col gap-1 flex-1"
    style="width: 100%"
  >
    <FloatLabel variant="on" class="w-full">
      <IconField>
        <InputIcon :class="icon" v-if="icon" />
        <InputText
          v-bind="$field"
          v-model="innerValue"
          class="w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </IconField>
      <label>{{ $t(label) }}</label>
    </FloatLabel>
    <Message v-if="$field.invalid" severity="error" size="small" class="mt-1">
      {{ $t($field.error?.message || "Invalid") }}
    </Message>
  </FormField>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  name: string;
  label: string;
  icon?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});
</script>

<style scoped></style>
