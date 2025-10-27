<template>
  <header
    class="w-full flex items-center px-5 py-2 justify-between sticky top-0 backdrop-blur-xl"
  >
    <div class="flex items-center gap-5">
      <!-- ปุ่มเปิดเมนูในมือถือ -->
      <div class="block md:hidden">
        <Button icon="pi pi-bars" @click="emit('update:visible', true)" />
      </div>
      <div class="font-semibold text-lg">{{ $t("branch") }} : Phet</div>
      <div class="hidden sm:block">{{ $t("date") }} : {{ dateTime }}</div>
    </div>

    <div class="flex items-center gap-5">
      <Button @click="toggle" variant="text" rounded>
        <template #icon>
          <i class="pi pi-cog" style="font-size: 1.5rem"></i>
        </template>
      </Button>
      <Popover ref="op">
        <div class="flex flex-col gap-4 w-[20rem]">
          <ui-set-locale />
          <Button icon="pi pi-sign-out" label="Logout" @click="onLogout" />
        </div>
      </Popover>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/lo';
dayjs.locale("lo");
const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const op = ref();
const toggle = (event: Event) => {
  op.value.toggle(event);
};
const onLogout = () => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: t("cancel"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("confirm"),
    },
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    },
  });
};

defineProps<{ visible: boolean }>();
const emit = defineEmits(["update:visible"]);

const dateTime = ref(dayjs().format("HH:mm:ss / DD-MMM-YYYY"));
let timer: number;

onMounted(() => {
  timer = window.setInterval(() => {
    dateTime.value = dayjs().format("HH:mm:ss / DD-MMM-YYYY");
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
