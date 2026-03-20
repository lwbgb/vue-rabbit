<template>
  <HomePanel title="热销好物" subTitle="热销爆款 品质保障" :items="hotList" />
</template>

<script setup lang="ts">
import { getHotGoods } from '@/apis/homeApi';
import type { Good } from '@/types/good';
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue';

const hotList = ref<Array<Good>>([]);
const initHotGoods = async () => {
  const res = await getHotGoods();
  console.log(`getHotGoods res:`, res);
  hotList.value = res.data.result;
};

onMounted(() => {
  initHotGoods();
});
</script>

<style scoped></style>
