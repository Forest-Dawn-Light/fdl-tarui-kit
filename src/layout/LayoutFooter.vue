<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <div class="layout-footer">
    <div class="footer-content">
      <p>© {{ currentYear }} Your Company Name. All rights reserved.</p>
    </div>
  </div>
</template>

<style scoped>
.layout-footer {
  padding: 16px;
  text-align: center;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.footer-content p {
  margin: 0;
  color: #666;
}
</style>