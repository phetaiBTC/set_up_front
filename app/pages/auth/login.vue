<template>
  <div class="h-screen w-full flex justify-center items-center">
    <Form
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="auth.login(formState)"
    >
      <h1>{{ $t("signin") }}</h1>
      <ui-input name="email" label="email" v-model="formState.email"></ui-input>
      <ui-input
        name="password"
        label="password"
        v-model="formState.password"
      ></ui-input>
      <Button :label="$t('signin')" type="submit" class="w-full" />
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

const auth = useAuth();
const formState = reactive<ILoginDto>({
  email: "admin@gmail.com",
  password: "11111111",
});
const resolver = zodResolver(LoginDto);
</script>

<style scoped></style>
