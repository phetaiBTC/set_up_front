<template>
  <div>
    <permission-table :data="permissionList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from '~/modules/permission/composables/usePermission';

const { fetchAll, permissionList, loading } = usePermissions();

onMounted(async () => {
  await fetchAll();
})
</script>

<style scoped></style>