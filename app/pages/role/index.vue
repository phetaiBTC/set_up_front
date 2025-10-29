<template>
    <UiDev>
        <role-dialog v-model:visible="visible" />
        <div class="flex justify-between sm:flex-row flex-col gap-2">
            <div class="flex flex-row gap-2 flex-1 justify-between items-center">
                <h1 class="text-3xl font-bold ">
                    Role
                </h1>
                <div class="flex flex-row gap-2">
                    <ToggleButton v-model="sort" onIcon="pi pi-sort-alpha-down" off-label="z-a" on-label="a-z"
                        offIcon="pi pi-sort-alpha-down-alt" aria-label="Toggle Status"
                        @change="setQuery({ sort: sort ? sortType.ASC : sortType.DESC })" />
                    <ToggleButton v-model="checked" onIcon="pi pi-check" :off-label="$t('inactive')"
                        :on-label="$t('active')" offIcon="pi pi-trash" aria-label="Toggle Status"
                        @change="setQuery({ is_active: checked ? Status.ACTIVE : Status.INACTIVE })" />
                </div>
            </div>
            <div class="flex sm:flex-row flex-col gap-2">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText class="sm:w-auto w-full" v-model="search" placeholder="Search"
                        @keyup.enter="setQuery({ search })" />
                </IconField>
                <Button class=" sm:ml-auto" :label="$t('add') + ' ' + $t('role')" icon="pi pi-plus"
                    @click="navigateTo('/role/form')" />
            </div>
        </div>
        <role-table :data="roleList" :loading="loading" />

        <Paginator :first="(query.page! - 1) * query.limit!" :rows="query.limit"
            :totalRecords="roleList.pagination.total" :rowsPerPageOptions="[5, 10, 20, 30]"
            @page="setQuery({ page: $event.page + 1, limit: $event.rows })" />
    </UiDev>
</template>

<script setup lang="ts">
import { useRole } from '~/modules/role/composables/useRole'
import { sortType, Status, type PaginationDto } from '~/shared/dto/pagination.dto'

const { fetchAll, roleList, loading } = useRole()
const visible = ref(false)
const search = ref('')
const checked = ref(true)
const sort = ref(true)
const router = useRouter()
const route = useRoute()

const query = reactive<PaginationDto>({
    page: Number(route.query.page),
    limit: Number(route.query.limit),
    search: String(route.query.search),
    sort: String(route.query.sort) as sortType,
    is_active: String(route.query.is_active) as Status,
})

const updateQuery = async (newQuery: Partial<typeof query>) => {
    Object.assign(query, newQuery)
    await router.replace({
        query: {
            ...route.query,
            ...newQuery
        }
    })
    await fetchAll(query)
}

const setQuery = (newQuery: Partial<typeof query>) => {
    updateQuery(newQuery)
}

onMounted(async () => {
    await fetchAll(query)
})
</script>
