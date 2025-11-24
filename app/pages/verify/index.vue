<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="p-5 bg-white rounded flex items-center justify-center flex-col">
      <i class="pi pi-verified text-primary" style="font-size: 60px" />
      <h1>{{ $t("verify") + " " + $t("email") }}</h1>
      <Button
        class="w-full mb-3"
        @click="verify(token as string)"
        :loading="loading"
      >
        {{ $t("verify") }}
      </Button>
      <NuxtLink to="/auth/login">{{ $t("login") }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { verify, loading } = useAuth();
const route = useRoute();

const token = route.query.token;

// ถ้าไม่มี token → redirect ออก
if (!token) {
  navigateTo("/auth/login");
}

definePageMeta({
  layout: "auth",
});
</script>
