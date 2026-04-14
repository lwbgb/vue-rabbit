<template>
  <HomePanel title="热销好物" subTitle="热销爆款 品质保障">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" :alt="item.title" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script setup lang="ts">
import { getHotGoods } from '@/apis/homeApi';
import type { Goods } from '@/types/goods';
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue';

const hotList = ref<Array<Goods>>([]);
const initHotGoods = async () => {
  const res = await getHotGoods();
  console.log(`getHotGoods res:`, res);
  hotList.value = res.data.result;
};

onMounted(() => {
  initHotGoods();
});
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
