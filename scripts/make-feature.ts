#!/usr/bin/env node
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Get feature name from command line arguments
const featureName = process.argv[2]

if (!featureName) {
  console.error('❌ Error: Feature name is required')
  console.log('Usage: pnpm make:feature <feature-name>')
  console.log('Example: pnpm make:feature users')
  process.exit(1)
}

// Validate feature name
if (!/^[a-z][a-z0-9-]*$/.test(featureName)) {
  console.error('❌ Error: Feature name must be lowercase, start with a letter, and can contain hyphens')
  process.exit(1)
}

// Helper functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const pascalCase = (str: string) =>
  str
    .split('-')
    .map(capitalize)
    .join('')
const camelCase = (str: string) => {
  const pascal = pascalCase(str)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const featurePath = join(process.cwd(),'modules', featureName)

// Check if feature already exists
if (existsSync(featurePath)) {
  console.error(`❌ Error: Feature "${featureName}" already exists`)
  process.exit(1)
}

// Template generators
const generateSchemaTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `import { z } from 'zod'

export const ${pascalName}Schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const Create${pascalName}Schema = ${pascalName}Schema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const Update${pascalName}Schema = Create${pascalName}Schema.partial()
`
}

const generateDtoTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `import type { z } from 'zod'
import { ${pascalName}Schema, Create${pascalName}Schema, Update${pascalName}Schema } from './${name}.schema'

export type ${pascalName} = z.infer<typeof ${pascalName}Schema>
export type Create${pascalName}Dto = z.infer<typeof Create${pascalName}Schema>
export type Update${pascalName}Dto = z.infer<typeof Update${pascalName}Schema>
`
}

const generateServiceTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `import type { ${pascalName}, Create${pascalName}Dto, Update${pascalName}Dto } from '../schemas/${name}.dto'
import { ${pascalName}Schema } from '../schemas/${name}.schema'
import { apiClient } from '~/shared/utils/http'
import { z } from 'zod'

export class ${pascalName}Service {
  private readonly baseUrl = '/api/${name}'

  async getAll(): Promise<${pascalName}[]> {
    const response = await apiClient.get<${pascalName}[]>(this.baseUrl)
    return z.array(${pascalName}Schema).parse(response)
  }

  async getById(id: string): Promise<${pascalName}> {
    const response = await apiClient.get<${pascalName}>(\`\${this.baseUrl}/\${id}\`)
    return ${pascalName}Schema.parse(response)
  }

  async create(data: Create${pascalName}Dto): Promise<${pascalName}> {
    const response = await apiClient.post<${pascalName}>(this.baseUrl, data)
    return ${pascalName}Schema.parse(response)
  }

  async update(id: string, data: Update${pascalName}Dto): Promise<${pascalName}> {
    const response = await apiClient.patch<${pascalName}>(\`\${this.baseUrl}/\${id}\`, data)
    return ${pascalName}Schema.parse(response)
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(\`\${this.baseUrl}/\${id}\`)
  }
}

export const ${camelCase(name)}Service = new ${pascalName}Service()
`
}

const generateStoreTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  const camelName = camelCase(name)
  return `import { defineStore } from 'pinia'
import type { ${pascalName} } from '../schemas/${name}.dto'

export const use${pascalName}Store = defineStore('${camelName}', () => {
  // State
  const items = ref<${pascalName}[]>([])
  const currentItem = ref<${pascalName} | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getById = computed(() => {
    return (id: string) => items.value.find(item => item.id === id)
  })

  const total = computed(() => items.value.length)

  // Actions
  function setItems(newItems: ${pascalName}[]) {
    items.value = newItems
  }

  function addItem(item: ${pascalName}) {
    items.value.push(item)
  }

  function updateItem(id: string, data: Partial<${pascalName}>) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...data }
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function setCurrentItem(item: ${pascalName} | null) {
    currentItem.value = item
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

  function reset() {
    items.value = []
    currentItem.value = null
    loading.value = false
    error.value = null
  }

  return {
    // State
    items,
    currentItem,
    loading,
    error,
    // Getters
    getById,
    total,
    // Actions
    setItems,
    addItem,
    updateItem,
    removeItem,
    setCurrentItem,
    setLoading,
    setError,
    reset,
  }
})
`
}

const generateComposableTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  const camelName = camelCase(name)
  return `import { ${camelName}Service } from '../services/${name}.service'
import { use${pascalName}Store } from '../stores/use${pascalName}Store'
import type { Create${pascalName}Dto, Update${pascalName}Dto } from '../schemas/${name}.dto'

export const use${pascalName}s = () => {
  const store = use${pascalName}Store()

  // Fetch all items
  const fetchAll = async () => {
    try {
      store.setLoading(true)
      store.setError(null)
      const items = await ${camelName}Service.getAll()
      store.setItems(items)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch ${name}'
      store.setError(message)
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // Fetch by ID
  const fetchById = async (id: string) => {
    try {
      store.setLoading(true)
      store.setError(null)
      const item = await ${camelName}Service.getById(id)
      store.setCurrentItem(item)
      return item
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch ${name}'
      store.setError(message)
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // Create new item
  const create = async (data: Create${pascalName}Dto) => {
    try {
      store.setLoading(true)
      const newItem = await ${camelName}Service.create(data)
      store.addItem(newItem)
      return newItem
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create ${name}'
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // Update item
  const update = async (id: string, data: Update${pascalName}Dto) => {
    try {
      store.setLoading(true)
      const updated = await ${camelName}Service.update(id, data)
      store.updateItem(id, updated)
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update ${name}'
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // Delete item
  const remove = async (id: string) => {
    try {
      store.setLoading(true)
      await ${camelName}Service.delete(id)
      store.removeItem(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete ${name}'
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  return {
    // State
    items: computed(() => store.items),
    currentItem: computed(() => store.currentItem),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    // Getters
    getById: store.getById,
    total: computed(() => store.total),
    // Actions
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  }
}
`
}

const generateCardComponentTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `<script setup lang="ts">
import type { ${pascalName} } from '../schemas/${name}.dto'

const props = defineProps<{
  item: ${pascalName}
}>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
    
    <div class="text-sm text-gray-500 mb-4">
      <p>ID: {{ item.id }}</p>
      <p>Created: {{ new Date(item.createdAt).toLocaleDateString() }}</p>
    </div>

    <div class="flex gap-2">
      <button 
        @click="emit('edit', item.id)"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button 
        @click="emit('delete', item.id)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>
`
}

const generateListComponentTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `<script setup lang="ts">
import type { ${pascalName} } from '../schemas/${name}.dto'
import ${pascalName}Card from './${pascalName}Card.vue'

defineProps<{
  items: ${pascalName}[]
}>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div>
    <div v-if="items.length === 0" class="text-center py-8 text-gray-500">
      No items found
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <${pascalName}Card
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>
`
}

const generateFormComponentTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `<script setup lang="ts">
import type { Create${pascalName}Dto } from '../schemas/${name}.dto'

const props = defineProps<{
  initialData?: Partial<Create${pascalName}Dto>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Create${pascalName}Dto]
  cancel: []
}>()

const formData = reactive<Create${pascalName}Dto>({
  name: props.initialData?.name || '',
})

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">
        Name
      </label>
      <input
        v-model="formData.name"
        type="text"
        required
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex gap-2">
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
`
}

const generateTypesTemplate = (name: string) => {
  return `// Additional types for ${name} feature
// Add custom types here if needed

export interface ${pascalCase(name)}Filters {
  search?: string
  sortBy?: 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface ${pascalCase(name)}Stats {
  total: number
  active: number
  inactive: number
}
`
}

const generateUtilsTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `import type { ${pascalName} } from '../schemas/${name}.dto'

/**
 * Format ${name} display name
 */
export const format${pascalName}Name = (item: ${pascalName}): string => {
  return item.name
}

/**
 * Sort ${name} items
 */
export const sort${pascalName}s = (
  items: ${pascalName}[],
  sortBy: 'name' | 'createdAt' = 'name',
  order: 'asc' | 'desc' = 'asc'
): ${pascalName}[] => {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
}

/**
 * Filter ${name} items
 */
export const filter${pascalName}s = (
  items: ${pascalName}[],
  search: string
): ${pascalName}[] => {
  if (!search) return items
  
  const searchLower = search.toLowerCase()
  return items.filter(item =>
    item.name.toLowerCase().includes(searchLower)
  )
}
`
}

const generateReadmeTemplate = (name: string) => {
  const pascalName = pascalCase(name)
  return `# ${pascalName} Feature

## Structure

\`\`\`
${name}/
├── components/           # UI Components
│   ├── ${pascalName}Card.vue
│   ├── ${pascalName}List.vue
│   └── ${pascalName}Form.vue
├── composables/         # Business Logic
│   └── use${pascalName}s.ts
├── schemas/            # Validation & Types
│   ├── ${name}.schema.ts
│   └── ${name}.dto.ts
├── services/           # API Calls
│   └── ${name}.service.ts
├── stores/            # State Management
│   └── use${pascalName}Store.ts
├── types/            # Additional Types
│   └── ${name}.types.ts
└── utils/           # Helper Functions
    └── ${name}.helpers.ts
\`\`\`

## Usage

### In a Page Component

\`\`\`vue
<script setup lang="ts">
import { use${pascalName}s } from '~/modules/${name}/composables/use${pascalName}s'
import ${pascalName}List from '~/modules/${name}/components/${pascalName}List.vue'

const { items, loading, fetchAll, remove } = use${pascalName}s()

await fetchAll()

const handleDelete = async (id: string) => {
  if (confirm('Are you sure?')) {
    await remove(id)
  }
}
</script>

<template>
  <div>
    <h1>${pascalName}s</h1>
    <${pascalName}List 
      :items="items" 
      @delete="handleDelete"
    />
  </div>
</template>
\`\`\`

## API Endpoints

- \`GET /api/${name}\` - Get all ${name}s
- \`GET /api/${name}/:id\` - Get ${name} by ID
- \`POST /api/${name}\` - Create new ${name}
- \`PATCH /api/${name}/:id\` - Update ${name}
- \`DELETE /api/${name}/:id\` - Delete ${name}
`
}

// Create feature structure
async function createFeature() {
  console.log(`\n🚀 Creating feature: ${featureName}\n`)

  try {
    // Create directories
    const dirs = [
      featurePath,
      join(featurePath, 'components'),
      join(featurePath, 'composables'),
      join(featurePath, 'schemas'),
      join(featurePath, 'services'),
      join(featurePath, 'stores'),
      join(featurePath, 'types'),
      join(featurePath, 'utils'),
    ]

    for (const dir of dirs) {
      await mkdir(dir, { recursive: true })
      console.log(`✅ Created: ${dir.replace(process.cwd(), '.')}`)
    }

    // Create files
    const files = [
      // Schemas
      {
        path: join(featurePath, 'schemas', `${featureName}.schema.ts`),
        content: generateSchemaTemplate(featureName),
      },
      {
        path: join(featurePath, 'schemas', `${featureName}.dto.ts`),
        content: generateDtoTemplate(featureName),
      },
      // Service
      {
        path: join(featurePath, 'services', `${featureName}.service.ts`),
        content: generateServiceTemplate(featureName),
      },
      // Store
      {
        path: join(featurePath, 'stores', `use${pascalCase(featureName)}Store.ts`),
        content: generateStoreTemplate(featureName),
      },
      // Composable
      {
        path: join(featurePath, 'composables', `use${pascalCase(featureName)}s.ts`),
        content: generateComposableTemplate(featureName),
      },
      // Components
      {
        path: join(featurePath, 'components', `${pascalCase(featureName)}Card.vue`),
        content: generateCardComponentTemplate(featureName),
      },
      {
        path: join(featurePath, 'components', `${pascalCase(featureName)}List.vue`),
        content: generateListComponentTemplate(featureName),
      },
      {
        path: join(featurePath, 'components', `${pascalCase(featureName)}Form.vue`),
        content: generateFormComponentTemplate(featureName),
      },
      // Types
      {
        path: join(featurePath, 'types', `${featureName}.types.ts`),
        content: generateTypesTemplate(featureName),
      },
      // Utils
      {
        path: join(featurePath, 'utils', `${featureName}.helpers.ts`),
        content: generateUtilsTemplate(featureName),
      },
      // README
      {
        path: join(featurePath, 'README.md'),
        content: generateReadmeTemplate(featureName),
      },
    ]

    for (const file of files) {
      await writeFile(file.path, file.content)
      console.log(`✅ Created: ${file.path.replace(process.cwd(), '.')}`)
    }

    console.log(`\n✨ Feature "${featureName}" created successfully!\n`)
    console.log('📝 Next steps:')
    console.log(`   1. Update the schema in: modules/${featureName}/schemas/${featureName}.schema.ts`)
    console.log(`   2. Customize components in: modules/${featureName}/components/`)
    console.log(`   3. Create a page in: app/pages/${featureName}/index.vue`)
    console.log(`   4. Create API routes in: server/api/${featureName}/`)
    console.log('\n📚 Read the README: modules/' + featureName + '/README.md\n')
  } catch (error) {
    console.error('❌ Error creating feature:', error)
    process.exit(1)
  }
}

// Run the script
createFeature()