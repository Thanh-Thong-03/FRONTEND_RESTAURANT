<template>
  <div>
    <q-layout>
      <q-page-container class="container">
        <RouterView />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
.container {
  Padding: 0px !important;
}
</style>