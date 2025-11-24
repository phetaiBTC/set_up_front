<template>
  <div class="h-screen w-full flex justify-center items-center">
    <Form
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="sendPassword(formState.email)"
    >
      <h1>{{ $t("forgot_password") }}</h1>
      <ui-input name="email" label="email" v-model="formState.email"></ui-input>
      <Button
        :label="$t('send')"
        type="submit"
        class="w-full"
        :loading="loading"
      />
      <NuxtLink to="/auth/login">{{ $t("login") }}</NuxtLink>
    </Form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { type ILoginDto, LoginDto } from "~/types/dto/auth.dto";
const { sendPassword } = useAuth();
const { loading } = storeToRefs(useAuthStore());
const formState = reactive<Omit<ILoginDto, "password">>({
  email: "admin@gmail.com",
});
const resolver = zodResolver(LoginDto);
</script>

<style scoped></style>
