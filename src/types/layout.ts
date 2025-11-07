import type { Component } from 'vue'

export interface MenuItem {
  key: string
  title: string
  icon?: string | Component
  children?: MenuItem[]
}