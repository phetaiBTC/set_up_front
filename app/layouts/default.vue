<template>
  <div class="flex w-full h-screen overflow-hidden">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <!-- <ConfirmPopup></ConfirmPopup> -->
    <!-- Mobile sidebar -->

    <Drawer v-model:visible="visible">
      <template #container>
        <LayoutSidebar />
      </template>
    </Drawer>

    <!-- Sidebar -->
    <div class="hidden md:block min-w-1/5 h-full sticky top-0 z-10" style="box-shadow: 0 0 5px var(--p-primary-color);">
      <div class="card flex justify-center h-full">
        <LayoutSidebar />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col h-full shadow-lg overflow-y-auto">
      <LayoutHeader v-model:visible="visible" />
      <div class="p-2">
        <Breadcrumb :home="home" :model="items" style="background: none; padding: 0 !important;" class="">
          <template #item="{ item, props }">
            <NuxtLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span class="text-primary font-semibold">{{ item.label }}</span>
              </a>
            </NuxtLink>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
              <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
            </a>
          </template>
        </Breadcrumb>
      </div>
      <section class="flex-1 p-4 text-surface-700 dark:text-surface-0">
        <NuxtPage />
      </section>
      <LayoutFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
const visible = ref(false);
const route = useRoute();

const home = ref({
  // icon: 'pi pi-home',
  route: '/',
  label: 'Home'
});

const items = ref<{ label: string; route?: string }[]>([]);
watch(
  () => route.path,
  (path) => {
    const segments = path.split('/').filter(Boolean);
    items.value = segments.map((seg, index) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      route: '/' + segments.slice(0, index + 1).join('/')
    }));
  },
  { immediate: true }
);
</script>
