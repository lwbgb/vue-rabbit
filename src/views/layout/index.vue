<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 为路由视图提供唯一的key，确保在路由切换时重新渲染 -->
  <!-- 缺陷：会导致视图内的所有组件都重新渲染 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
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
