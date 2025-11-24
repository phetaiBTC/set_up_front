<template>
  <div>
    <div class="grid grid-cols-12 gap-8">
      <!-- UiStats -->
      <UiStats
        title="roles"
        :count="user.roles.length"
        icon="pi pi-user-edit text-xl"
      />
      <UiStats
        title="permissions"
        :count="user.permissions.length"
        icon="pi pi-check-square text-xl"
      />
      <!-- User Table -->
      <div class="col-span-12">
        <div class="card">
          <header class="flex flex-row justify-between">
            <div class="flex flex-row items-center gap-1">
              <Avatar
                :label="user.username.charAt(0).toUpperCase()"
                class="mr-2"
                size="xlarge"
              />
              <div class="flex flex-col">
                <h3 style="margin: 0">
                  {{ user.username }}
                  <i
                    class="pi pi-verified text-blue-500"
                    v-if="user.is_verified"
                  ></i>
                </h3>
                <h5 class="text-surface-50" style="margin: 0">
                  {{ user.email }}
                </h5>
              </div>
            </div>
            <div>
              <Button
                :label="$t('changePassword')"
                class="p-button-outlined"
                @click="visible = true"
                icon="pi pi-lock"
              />
            </div>
          </header>
          <user-change-password
            v-model:visible="visible"
          ></user-change-password>
        </div>
      </div>
      <div class="col-span-12">
        <div class="card flex flex-row justify-evenly">
          <div class="flex flex-col justify-center items-center">
            <p class="text-xl" style="margin: 0">
              <i class="pi pi-plus-circle text-green-500 mr-2"></i>{{ $t("createdAt") }}
            </p>
            <p style="margin: 0">
              {{ user.createdAt }}
            </p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <p class="text-xl" style="margin: 0">
              <i class="pi pi-pen-to-square text-blue-500 mr-2"></i>{{ $t("updatedAt") }}
            </p>
            <p style="margin: 0">
              {{ user.updatedAt }}
            </p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <p class="text-xl" style="margin: 0">
              <i class="pi pi-trash text-red-500 mr-2"></i>{{ $t("deletedAt") }}
            </p>
            <p style="margin: 0">
              {{ user.deletedAt ? user.deletedAt : "-" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { profile } = useAuth();
const { user } = useUserStore();
const visible = ref(false);
await profile();
</script>

<style scoped></style>
