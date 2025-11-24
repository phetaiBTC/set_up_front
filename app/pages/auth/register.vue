<template>
  <div class="h-screen w-full flex justify-center items-center">
    <Form
      :resolver="resolver"
      class="flex flex-col gap-3 justify-center items-center"
      :initialValues="formState"
      @submit="register(formState)"
    >
      <h1>{{ $t("signup") }}</h1>
      <ui-input
        name="username"
        label="username"
        v-model="formState.username"
      ></ui-input>
      <ui-input name="email" label="email" v-model="formState.email"></ui-input>
      <!-- <ui-input
        name="password"
        label="password"
        v-model=""
      ></ui-input> -->
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
        :label="$t('signup')"
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
  name: "Register",
});
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { type IRegisterDto, RegisterDto } from "~/types/dto/auth.dto";
const { register } = useAuth();
const { loading } = storeToRefs(useAuthStore());
const formState = reactive<IRegisterDto>({
  username: "phetaibtc",
  email: "phetaibtc@gmail.com",
  password: "11111111",
  confirm_password: "11111111",
});
const resolver = zodResolver(RegisterDto);
</script>

<style scoped></style>
