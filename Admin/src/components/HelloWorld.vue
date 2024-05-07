<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <h1>hi</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
