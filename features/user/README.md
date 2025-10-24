# User Feature

## Structure

```
user/
├── components/           # UI Components
│   ├── UserCard.vue
│   ├── UserList.vue
│   └── UserForm.vue
├── composables/         # Business Logic
│   └── useUsers.ts
├── schemas/            # Validation & Types
│   ├── user.schema.ts
│   └── user.dto.ts
├── services/           # API Calls
│   └── user.service.ts
├── stores/            # State Management
│   └── useUserStore.ts
├── types/            # Additional Types
│   └── user.types.ts
└── utils/           # Helper Functions
    └── user.helpers.ts
```

## Usage

### In a Page Component

```vue
<script setup lang="ts">
import { useUsers } from '~/features/user/composables/useUsers'
import UserList from '~/features/user/components/UserList.vue'

const { items, loading, fetchAll, remove } = useUsers()

await fetchAll()

const handleDelete = async (id: string) => {
  if (confirm('Are you sure?')) {
    await remove(id)
  }
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <UserList 
      :items="items" 
      @delete="handleDelete"
    />
  </div>
</template>
```

## API Endpoints

- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `POST /api/user` - Create new user
- `PATCH /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user
