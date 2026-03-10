<script setup lang="ts">
import { getCategory } from '@test/apis/test';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

onMounted(() => {
  getCategory().then(res => {
    console.log(res);
  });
});
</script>

<template>
  <el-button type="primary" plain>Primary</el-button>
  <router-view>

  </router-view>
</template>

<style scoped></style>
