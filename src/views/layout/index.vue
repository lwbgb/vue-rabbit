<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore';
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();
const { initCategory } = categoryStore;

onMounted(() => {
  initCategory();
});
</script>

<style scoped></style>
