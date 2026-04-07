<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryInfo?.parentId}` }"
          >{{ subCategoryInfo?.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryInfo?.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <good-item v-for="good in pageResult?.items" :key="good.id" :good="good"></good-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryFilterById, getSubCategoryInfo } from '@/apis/categoryApi';
import type { SubCategory } from '@/types/category';
import type { Good } from '@/types/good';
import type { PageResult } from '@/types/result';
import { onMounted, ref } from 'vue';
import GoodItem from '../Home/components/GoodItem.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const subCategoryInfo = ref<SubCategory>();
const getSubCategories = async () => {
  const res = await getCategoryFilterById(props.id);
  console.log(`getSubCategories`, res);
  subCategoryInfo.value = res.data.result;
};

const pageResult = ref<PageResult<Good>>();
const getSubCategory = async () => {
  const res = await getSubCategoryInfo({
    categoryId: +props.id,
    page: 1,
    pageSize: 10,
    sortField: 'publishTime',
  });
  console.log(`getSubCategory`, res);
  pageResult.value = res.data.result;
};

onMounted(() => {
  getSubCategories();
  getSubCategory();
});
</script>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
