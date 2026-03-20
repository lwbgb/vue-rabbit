<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" :items="newList" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue';
import { getNewGoods } from '@/apis/homeApi';
import type { Good } from '@/types/good';

const newList = ref<Array<Good>>([]);
const initNewGoods = async () => {
  const res = await getNewGoods();
  console.log(`getNewGoods res:`, res);
  newList.value = res.data.result;
};
onMounted(() => {
  initNewGoods();
});
</script>

<style scoped lang="scss">

</style>
