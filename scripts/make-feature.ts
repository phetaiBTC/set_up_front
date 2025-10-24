import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  appendFileSync,
} from "fs";
import { join } from "path";

const featureName = process.argv[2];

if (!featureName) {
  console.error(
    "❌ Please provide a feature name. Example: pnpm run make:feature users"
  );
  process.exit(1);
}

const baseDir = join(process.cwd(), "features", featureName);
if (existsSync(baseDir)) {
  console.error(`⚠️ Feature "${featureName}" already exists.`);
  process.exit(1);
}

const dirs = [
  "presentation/components",
  "presentation/pages",
  "presentation/composables",
  "application",
  "domain",
  "infrastructure",
];

dirs.forEach((dir) => mkdirSync(join(baseDir, dir), { recursive: true }));

// utils
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function singular(str: string) {
  return str.endsWith("s") ? str.slice(0, -1) : str;
}

const entityName = capitalize(singular(featureName));

// ---------- Domain Layer ----------

writeFileSync(
  join(baseDir, "domain", `${featureName}.entity.ts`),
  `export interface ${entityName} {
  id: number
  name: string
}
`
);

writeFileSync(
  join(baseDir, "domain", `${featureName}.schema.ts`),
  `import { z } from 'zod'

export const ${entityName}Schema = z.object({
  id: z.number(),
  name: z.string().min(2),
})

export const Create${entityName}Schema = ${entityName}Schema.omit({ id: true })
export const Update${entityName}Schema = ${entityName}Schema.partial()
`
);

// ---------- Infrastructure Layer ----------

writeFileSync(
  join(baseDir, "infrastructure", `${featureName}.repository.ts`),
  `import { useApi } from '~/composables/useApi''
import { ${entityName}Schema, Create${entityName}Schema, Update${entityName}Schema } from '../domain/${featureName}.schema'
import { z } from 'zod'

const api = useApi()

export const ${featureName}Repository = {
  async findAll() {
    const res = await api.get('/${featureName}')
    return z.array(${entityName}Schema).parse(res.data)
  },

  async findById(id: number) {
    const res = await api.get(\`/${featureName}/\${id}\`)
    return ${entityName}Schema.parse(res.data)
  },

  async create(payload: z.infer<typeof Create${entityName}Schema>) {
    const res = await api.post('/${featureName}', payload)
    return ${entityName}Schema.parse(res.data)
  },

  async update(id: number, payload: z.infer<typeof Update${entityName}Schema>) {
    const res = await api.patch(\`/${featureName}/\${id}\`, payload)
    return ${entityName}Schema.parse(res.data)
  },

  async remove(id: number) {
    await api.delete(\`/${featureName}/\${id}\`)
    return true
  },
}
`
);

// ---------- Application Layer ----------

const useCases = [
  ["get", "findAll"],
  ["create", "create"],
  ["update", "update"],
  ["delete", "remove"],
];

useCases.forEach(([action, method]) => {
  const className = `${capitalize(action)}${entityName}UseCase`;
  const fileName = `${action}-${featureName}.usecase.ts`;
  const methodArg =
    action === "get"
      ? ""
      : action === "delete"
      ? "id: number"
      : action === "update"
      ? "id: number, data: any"
      : "data: any";

  const callArg =
    action === "get"
      ? ""
      : action === "delete"
      ? "id"
      : action === "update"
      ? "id, data"
      : "data";

  writeFileSync(
    join(baseDir, "application", fileName),
    `import { ${featureName}Repository } from '../infrastructure/${featureName}.repository'
import type { ${entityName} } from '../domain/${featureName}.entity'

export class ${className} {
  async execute(${methodArg}): Promise<any> {
    return await ${featureName}Repository.${method}(${callArg})
  }
}
`
  );
});

// ---------- Presentation Layer ----------

// Pinia Store
writeFileSync(
  join(baseDir, "presentation/composables", `use${entityName}Store.ts`),
  `import { defineStore } from 'pinia'
import { Get${entityName}UseCase } from '../../application/get-${featureName}.usecase'
import { Create${entityName}UseCase } from '../../application/create-${featureName}.usecase'
import { Update${entityName}UseCase } from '../../application/update-${featureName}.usecase'
import { Delete${entityName}UseCase } from '../../application/delete-${featureName}.usecase'
import type { ${entityName} } from '../../domain/${featureName}.entity'

export const use${entityName}Store = defineStore('${featureName}', {
  state: () => ({
    items: [] as ${entityName}[],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const usecase = new Get${entityName}UseCase()
        this.items = await usecase.execute()
      } finally {
        this.loading = false
      }
    },
    async create(data: Partial<${entityName}>) {
      const usecase = new Create${entityName}UseCase()
      await usecase.execute(data)
      await this.fetchAll()
    },
    async update(id: number, data: Partial<${entityName}>) {
      const usecase = new Update${entityName}UseCase()
      await usecase.execute(id, data)
      await this.fetchAll()
    },
    async remove(id: number) {
      const usecase = new Delete${entityName}UseCase()
      await usecase.execute(id)
      await this.fetchAll()
    },
  },
})
`
);

// Pages

writeFileSync(
  join(baseDir, "presentation/pages", "index.vue"),
  `<script setup lang="ts">
import { use${entityName}Store } from '../composables/use${entityName}Store'
const store = use${entityName}Store()
onMounted(() => store.fetchAll())
</script>

<template>
  <div class="p-4">
    <h1>${entityName} List</h1>
    <NuxtLink to="/${featureName}/create" class="text-blue-500">+ Create</NuxtLink>
    <ul>
      <li v-for="item in store.items" :key="item.id">
        <NuxtLink :to="'/${featureName}/' + item.id">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
`
);

writeFileSync(
  join(baseDir, "presentation/pages", "create.vue"),
  `<script setup lang="ts">
import { ref } from 'vue'
import { use${entityName}Store } from '../composables/use${entityName}Store'
const store = use${entityName}Store()
const form = ref({ name: '' })

const submit = async () => {
  await store.create(form.value)
  navigateTo('/${featureName}')
}
</script>

<template>
  <div class="p-4">
    <h1>Create ${entityName}</h1>
    <form @submit.prevent="submit" class="flex flex-col gap-2">
      <input v-model="form.name" placeholder="Name" class="border p-2 rounded"/>
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  </div>
</template>
`
);

writeFileSync(
  join(baseDir, "presentation/pages", "[id].vue"),
  `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { use${entityName}Store } from '../composables/use${entityName}Store'
const store = use${entityName}Store()
const route = useRoute()
const id = Number(route.params.id)
const form = ref({ name: '' })

onMounted(async () => {
  await store.fetchAll()
  const item = store.items.find((x) => x.id === id)
  if (item) form.value = { ...item }
})

const update = async () => {
  await store.update(id, form.value)
  navigateTo('/${featureName}')
}

const remove = async () => {
  await store.remove(id)
  navigateTo('/${featureName}')
}
</script>

<template>
  <div class="p-4">
    <h1>Edit ${entityName}</h1>
    <form @submit.prevent="update" class="flex flex-col gap-2">
      <input v-model="form.name" placeholder="Name" class="border p-2 rounded"/>
      <div class="flex gap-2">
        <button class="bg-green-500 text-white px-4 py-2 rounded">Update</button>
        <button @click.prevent="remove" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  </div>
</template>
`
);

// ---------- Auto register route (Nuxt 4 with app directory) ----------

const pagesDir = join(process.cwd(), "app", "pages");
if (!existsSync(pagesDir)) {
  mkdirSync(pagesDir, { recursive: true });
}

const featurePageDir = join(pagesDir, featureName);
if (!existsSync(featurePageDir)) {
  mkdirSync(featurePageDir);
}

writeFileSync(
  join(featurePageDir, "index.vue"),
  `<script setup lang="ts">
import IndexPage from '../../../features/${featureName}/presentation/pages/index.vue'
</script>

<template>
  <IndexPage />
</template>
`
);

writeFileSync(
  join(featurePageDir, "create.vue"),
  `<script setup lang="ts">
import CreatePage from '../../../features/${featureName}/presentation/pages/create.vue'
</script>

<template>
  <CreatePage />
</template>
`
);

writeFileSync(
  join(featurePageDir, "[id].vue"),
  `<script setup lang="ts">
import DetailPage from '../../../features/${featureName}/presentation/pages/[id].vue'
</script>

<template>
  <DetailPage />
</template>
`
);

console.log(`✅ Feature "${featureName}" created successfully! 🚀`);
console.log(`📁 Structure created in:`);
console.log(`   - features/${featureName}`);
console.log(`   - app/pages/${featureName}`);
