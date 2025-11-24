<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="$t('changePassword')"
    :style="{ width: '25rem' }"
  >
    <Form
      ref="formRef"
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="handleSubmit()"
    >
      <FormField
        v-slot="$field"
        name="oldPassword"
        class="flex flex-col gap-1 flex-1 w-full mt-2"
      >
        <FloatLabel variant="on" class="w-full">
          <IconField class="w-full">
            <Password
              input-class="w-full"
              v-model="formState.oldPassword"
              toggleMask
              :feedback="false"
              class="w-full"
            />
          </IconField>
          <label>{{ $t("password") }}</label>
        </FloatLabel>

        <Message
          v-if="$field.invalid"
          severity="error"
          size="small"
          class="mt-1"
        >
          {{ $t($field.error?.message || "Invalid") }}
        </Message>
      </FormField>
      <FormField
        v-slot="$field"
        name="newPassword"
        class="flex flex-col gap-1 flex-1 w-full"
      >
        <FloatLabel variant="on" class="w-full">
          <IconField class="w-full">
            <Password
              input-class="w-full"
              v-model="formState.newPassword"
              toggleMask
              class="w-full"
            />
          </IconField>
          <label>{{ $t("confirm_password") }}</label>
        </FloatLabel>

        <Message
          v-if="$field.invalid"
          severity="error"
          size="small"
          class="mt-1"
        >
          {{ $t($field.error?.message || "Invalid") }}
        </Message>
      </FormField>
      <Button
        :label="$t('confirm')"
        type="submit"
        class="w-full"
        :loading="loading"
      />
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import {
  ChangePasswordDto,
  type IChangePasswordDto,
} from "~/types/dto/auth.dto";

const { changePassword } = useAuth();
const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits(["update:visible"]);
const visible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});
const { loading } = storeToRefs(useAuthStore());
const formRef = ref();
const formState = reactive<IChangePasswordDto>({
  oldPassword: "",
  newPassword: "",
});
const resolver = zodResolver(ChangePasswordDto);

const resetForm = () => {
  formState.oldPassword = "";
  formState.newPassword = "";
  formRef.value?.reset();
};

const handleSubmit = async () => {
  await changePassword(formState);
  visible.value = false;
  resetForm();
};
</script>

<style scoped></style>
