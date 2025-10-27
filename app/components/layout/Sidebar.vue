<template>
  <div class="flex flex-col h-full w-full dark:bg-surface-900">
    <div class="flex items-center justify-center px-6 py-3 shrink-0">
      <span class="inline-flex items-center gap-2">
        <img src="https://i.pinimg.com/736x/36/71/3c/36713c5bfdd45b0dcd9c0867c0f6d5fd.jpg" height="50" width="50"
          alt="..." class=" rounded-full">
        <span class="font-semibold text-2xl text-primary">Your Logo</span>
      </span>
    </div>
    <div class="overflow-y-auto hide-scrollbar">
      <ul class="list-none m-0" v-for="menu_items in menuItems">
        <li>
          <div v-ripple v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-slideup',
          }"
            class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">

            <span class="font-bold flex items-center">
              <i :class="menu_items.icon" class="mr-2"></i>
              {{ $t(menu_items.label) }}
            </span>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul class="list-none p-0 m-0 overflow-hidden pl-3">
            <li v-for="menu in menu_items.menu">

              <!-- menu -->
              <a v-if="!menu.submenu" v-ripple @click="handleMenuClick(menu.to)" :class="[
                'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                isActive(menu.to)
                  ? 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-0'
                  : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
              ]">
                <i class="mr-2" :class="menu.icon"></i>
                <span class="font-medium">{{ $t(menu.label) }}</span>
              </a>

              <!-- submenu -->
              <div v-else>
                <a v-ripple v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }" :class="[
                  'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                  hasActiveSubmenu(menu.submenu)
                    ? 'bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 font-semibold'
                    : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
                ]">
                  <i class="pi pi-chart-line mr-2"></i>
                  <span class="font-medium">{{ $t(menu.label) }}</span>
                  <i class="pi pi-chevron-down ml-auto"></i>
                </a>
                <ul
                  class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                  <li v-for="submenu in menu.submenu">
                    <a v-ripple @click="handleMenuClick(submenu.to)" :class="[
                      'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                      isActive(submenu.to)
                        ? 'bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 font-semibold'
                        : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
                    ]">
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">{{ $t(submenu.label) }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list-none m-0">
        <li>
          <div v-ripple v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-slideup',
          }"
            class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">
            <span class="font-medium">APPLICATION</span>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <a v-ripple @click="handleMenuClick('/projects')" :class="[
                'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                isActive('/projects')
                  ? 'bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
              ]">
                <i class="pi pi-folder mr-2"></i>
                <span class="font-medium">Projects</span>
              </a>
            </li>
            <li>
              <a v-ripple @click="handleMenuClick('/performance')" :class="[
                'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                isActive('/performance')
                  ? 'bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
              ]">
                <i class="pi pi-chart-bar mr-2"></i>
                <span class="font-medium">Performance</span>
              </a>
            </li>
            <li>
              <a v-ripple @click="handleMenuClick('/settings')" :class="[
                'flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple',
                isActive('/settings')
                  ? 'bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800'
              ]">
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
      <a v-ripple
        class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold">Amy Elsner</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuItems = ref<
  {
    label: string;
    icon: string;
    menu: {
      permission: string;
      label: string;
      icon: string;
      to?: string;
      submenu?: {
        label: string;
        icon: string;
        to?: string;
        permission: string;
      }[];
    }[];
    permission: string;
  }[]
>([
  {
    label: "branch",
    icon: "pi pi-home",
    menu: [
      {
        label: "Dashboard",
        icon: "pi pi-home",
        to: "/",
        permission: "",
      },
      {
        label: "Dashboard",
        icon: "pi pi-home",
        to: "/dashboard",
        permission: "",
      },
      {
        label: "products",
        icon: "pi pi-home",
        submenu: [
          {
            label: "phet",
            icon: "pi pi-home",
            to: "/products/phet",
            permission: "",
          },
          {
            label: "products",
            icon: "pi pi-home",
            to: "/products/list",
            permission: "",
          },
        ],
        permission: "",
      },
      {
        label: "products",
        icon: "pi pi-home",
        submenu: [
          {
            label: "products",
            icon: "pi pi-home",
            to: "/products/category",
            permission: "",
          },
          {
            label: "products",
            icon: "pi pi-home",
            to: "/products/inventory",
            permission: "",
          },
        ],
        permission: "",
      },
    ],
    permission: "",
  },
  {
    label: "user",
    icon: "pi pi-users",
    menu: [
      {
        label: "user",
        icon: "pi pi-user",
        to: "/user",
        permission: "",
      },
      {
        label: "role",
        icon: "pi pi-user-edit",
        to: "/role",
        permission: "",
      },
    ],
    permission: "",
  },
]);

// ตรวจสอบว่าเมนูนี้ active หรือไม่
const isActive = (path?: string): boolean => {
  if (!path) return false;
  return route.path === path;
};

// ตรวจสอบว่า submenu ใดๆ ใน array นี้ active หรือไม่
const hasActiveSubmenu = (submenu?: { to?: string }[]) => {
  if (!submenu) return false;
  return submenu.some(item => isActive(item.to));
};

// จัดการการคลิกเมนู
const handleMenuClick = (path?: string) => {
  if (path) {
    router.push(path);
  }
};
</script>

<style scoped></style>