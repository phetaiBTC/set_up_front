<template>
  <div class="h-screen w-full flex justify-center items-center">
    <Form
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="
        resetPassword(
          token as string,
          formState.password,
          formState.confirm_password
        )
      "
    >
      <h1>{{ $t("reset_password") }}</h1>
      <FormField
        v-slot="$field"
        name="password"
        class="flex flex-col gap-1 flex-1 w-full"
      >
        <FloatLabel variant="on" class="w-full">
          <IconField class="w-full">
            <Password v-model="formState.password" toggleMask class="w-full" />
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
        name="confirm_password"
        class="flex flex-col gap-1 flex-1 w-full"
      >
        <FloatLabel variant="on" class="w-full">
          <IconField class="w-full">
            <Password
              v-model="formState.confirm_password"
              toggleMask
              :feedback="false"
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
      <div class="justify-between w-full flex">
        <NuxtLink to="/auth/login">{{ $t("login") }}</NuxtLink>
        <NuxtLink to="/auth/forgot" style="text-decoration: underline">{{
          $t("sendVerify")
        }}</NuxtLink>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { type IRegisterDto, RegisterDto } from "~/types/dto/auth.dto";
const { resetPassword } = useAuth();
const route = useRoute();
const token = route.query.token;
if (!token) {
  navigateTo("/auth/login");
}
const { loading } = storeToRefs(useAuthStore());
const formState = reactive<Omit<IRegisterDto, "username" | "email">>({
  password: "11111111",
  confirm_password: "11111111",
});
const resolver = zodResolver(RegisterDto);
</script>

<style scoped></style>
