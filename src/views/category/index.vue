<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryInfo?.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 分类数据 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryInfo?.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryInfo?.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodItem v-for="good in item.goods" :key="good.id" :good="good" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryInfoById } from '@/apis/homeApi';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { type CategoryInfo } from '@/types/category';
import { useHomeStore } from '@/stores/homeStore';
import { storeToRefs } from 'pinia';
import { HomeBannerType } from '@/constants/component.const';
import GoodItem from '../Home/components/GoodItem.vue';

const categoryInfo = ref<CategoryInfo>();
// const route = useRoute();
const props = defineProps<{
  id: string;
}>();

const getCategoryInfo = async () => {
  // const res = await getCategoryInfoById(+(route.params.id ?? 0));
  const res = await getCategoryInfoById(props.id);
  console.log(`getCategoryInfo:`, res);
  categoryInfo.value = res.data.result;
};

const homeStore = useHomeStore();
const { bannerList } = storeToRefs(homeStore);
const { initHomeBanner } = homeStore;

onMounted(() => {
  getCategoryInfo();
  initHomeBanner(HomeBannerType.CATEGORY_PAGE);
});
</script>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
