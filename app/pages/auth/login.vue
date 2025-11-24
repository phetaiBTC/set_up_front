<template>
  <div class="h-screen w-full flex justify-center items-center">
    <Form
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="login(formState)"
    >
      <h1>{{ $t("signin") }}</h1>
      <ui-input name="email" label="email" v-model="formState.email"></ui-input>
      <FormField
        v-slot="$field"
        name="password"
        class="flex flex-col gap-1 flex-1 w-full"
      >
        <FloatLabel variant="on" class="w-full">
          <IconField class="w-full">
            <Password
              v-model="formState.password"
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
      <Button
        :label="$t('signin')"
        type="submit"
        class="w-full"
        :loading="loading"
      />
      <div class="justify-between w-full flex">
        <NuxtLink to="/auth/forgot">{{ $t("forgot_password") }}</NuxtLink>
        <NuxtLink to="/auth/register">{{ $t("register") }}</NuxtLink>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  name: "Login",
});
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { type ILoginDto, LoginDto } from "~/types/dto/auth.dto";
const { login } = useAuth();
const { loading } = storeToRefs(useAuthStore());
const formState = reactive<ILoginDto>({
  email: "admin@gmail.com",
  password: "11111111",
});
const resolver = zodResolver(LoginDto);
</script>

<style scoped></style>
