<template>
  <div class="card flex justify-center h-full">
    <!-- <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }"> -->
    <div class="flex flex-col h-full border w-full" >
      <div class="flex items-center justify-between px-6 pt-4 shrink-0">
        <span class="inline-flex items-center gap-2"> </span>
        <!-- <span>
          <Button
            type="button"
            @click="closeCallback"
            icon="pi pi-times"
            rounded
            variant="outlined"
          ></Button>
        </span> -->
      </div>
      <div class="overflow-y-auto">
        <ul class="list-none p-4 m-0">
          <li>
            <div
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-slideup',
              }"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">FAVORITES</span>
              <i class="pi pi-chevron-down"></i>
            </div>
            <ul class="list-none p-0 m-0 overflow-hidden">
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-home mr-2"></i>
                  <span class="font-medium">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-bookmark mr-2"></i>
                  <span class="font-medium">Bookmarks</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-chart-line mr-2"></i>
                  <span class="font-medium">Reports</span>
                  <i class="pi pi-chevron-down ml-auto"></i>
                </a>
                <ul
                  class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                >
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-slideup',
                      }"
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">Revenue</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                    >
                      <li>
                        <a
                          v-ripple
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-table mr-2"></i>
                          <span class="font-medium">View</span>
                        </a>
                      </li>
                      <li>
                        <a
                          v-ripple
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-search mr-2"></i>
                          <span class="font-medium">Search</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">Expenses</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-users mr-2"></i>
                  <span class="font-medium">Team</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-comments mr-2"></i>
                  <span class="font-medium">Messages</span>
                  <span
                    class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
                    style="min-width: 1.5rem; height: 1.5rem"
                    >3</span
                  >
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-calendar mr-2"></i>
                  <span class="font-medium">Calendar</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-cog mr-2"></i>
                  <span class="font-medium">Settings</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="list-none p-4 m-0">
          <li>
            <div
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-slideup',
              }"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">APPLICATION</span>
              <i class="pi pi-chevron-down"></i>
            </div>
            <ul class="list-none p-0 m-0 overflow-hidden">
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-folder mr-2"></i>
                  <span class="font-medium">Projects</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-chart-bar mr-2"></i>
                  <span class="font-medium">Performance</span>
                </a>
              </li>
              <li>
                <a
                  v-ripple
                  class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-cog mr-2"></i>
                  <span class="font-medium">Settings</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="mt-auto">
        <hr
          class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
        />
        <a
          v-ripple
          class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">Amy Elsner</span>
        </a>
      </div>
    </div>
    <!-- <Button icon="pi pi-bars" @click="visible = true" /> -->
  </div>
</template>

<script setup></script>
