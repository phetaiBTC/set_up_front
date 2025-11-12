<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue";

// สมมติว่ามี composable useLayout() ที่คืนค่าพวกนี้ออกมา
// (จะอธิบายต่อข้างล่าง)
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null);

// 🔹 Watch การเปลี่ยนสถานะ sidebar
watch(isSidebarActive, (newVal) => {
  if (newVal) bindOutsideClickListener();
  else unbindOutsideClickListener();
});

// 🔹 คำนวณ class ของ layout
const containerClass = computed(() => ({
  "layout-overlay": layoutConfig.menuMode === "overlay",
  "layout-static": layoutConfig.menuMode === "static",
  "layout-static-inactive":
    layoutState.staticMenuDesktopInactive &&
    layoutConfig.menuMode === "static",
  "layout-overlay-active": layoutState.overlayMenuActive,
  "layout-mobile-active": layoutState.staticMenuMobileActive,
}));

// 🔹 ฟังก์ชัน bind listener (เมื่อ sidebar active)
function bindOutsideClickListener(): void {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: MouseEvent) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
}

// 🔹 ฟังก์ชัน unbind listener (เมื่อ sidebar ปิด)
function unbindOutsideClickListener(): void {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

// 🔹 ตรวจสอบว่าคลิกอยู่นอก sidebar หรือไม่
function isOutsideClicked(event: MouseEvent): boolean {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  // ถ้าไม่เจอ element ให้ถือว่าเป็น outside
  if (!sidebarEl || !topbarEl) return true;

  const target = event.target as Node | null;
  if (!target) return true;

  return !(
    sidebarEl.isSameNode(target) ||
    sidebarEl.contains(target) ||
    topbarEl.isSameNode(target) ||
    topbarEl.contains(target)
  );
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <layouts-app-topbar />
    <layouts-app-sidebar />

    <div class="layout-main-container">
      <div class="layout-main">
        <NuxtPage />
      </div>
      <app-footer />
    </div>

    <div class="layout-mask animate-fadein"></div>
  </div>

  <Toast />
</template>
