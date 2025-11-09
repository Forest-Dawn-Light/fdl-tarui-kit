# Tauri + Vue + TypeScript

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Path Alias

This project uses path alias configuration to simplify imports:

- `@` maps to the `src` directory
- Example: `import { usePermissionStore } from '@/store/permission'`

See [PATH_ALIAS.md](./PATH_ALIAS.md) for detailed configuration instructions.

## Environment Configuration

This project supports environment-based configuration through `.env` files:

- `.env` - Default environment variables
- `.env.development` - Development environment variables
- `.env.production` - Production environment variables

### Permission System Configuration

The permission system can be enabled/disabled via environment variables:

```env
VITE_PERMISSION_ENABLED=true
```

Set to `false` to disable the permission system (all permissions will be granted).

See [PERMISSION_CONFIG.md](./PERMISSION_CONFIG.md) for detailed configuration instructions.

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.

### Run Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui
```

### Writing Tests

- Tests are written using Vitest and Vue Test Utils
- Test files should be named with `.test.ts` or `.spec.ts` extension
- Tests are organized in the `src/__test__` directory, organized by module type:
  - `src/__test__/components` - Component tests
  - `src/__test__/utils` - Utility function tests
  - `src/__test__/store` - Store tests
  - `src/__test__` - General tests

### Test Coverage

To generate test coverage reports:

```bash
pnpm test:run --coverage
```
