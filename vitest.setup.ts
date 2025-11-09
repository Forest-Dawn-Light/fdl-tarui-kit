import { vi } from 'vitest'

// 配置 jsdom
const { JSDOM } = await import('jsdom')

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable',
})

global.window = dom.window as any
global.document = dom.window.document
global.navigator = dom.window.navigator
global.CustomEvent = dom.window.CustomEvent

// 模拟 localStorage
Object.defineProperty(global, 'localStorage', {
  value: {
    store: {} as Record<string, string>,
    getItem(key: string) {
      return this.store[key] || null
    },
    setItem(key: string, value: string) {
      this.store[key] = value.toString()
    },
    removeItem(key: string) {
      delete this.store[key]
    },
    clear() {
      this.store = {}
    }
  },
  writable: true,
})

// 模拟 sessionStorage
Object.defineProperty(global, 'sessionStorage', {
  value: {
    store: {} as Record<string, string>,
    getItem(key: string) {
      return this.store[key] || null
    },
    setItem(key: string, value: string) {
      this.store[key] = value.toString()
    },
    removeItem(key: string) {
      delete this.store[key]
    },
    clear() {
      this.store = {}
    }
  },
  writable: true,
})

// 模拟 matchMedia
Object.defineProperty(global.window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// 模拟 scrollTo
Object.defineProperty(global.window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

export {}