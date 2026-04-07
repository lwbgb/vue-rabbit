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
      <el-tabs v-model="params.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
      </div>
      <el-scrollbar class="goods-scrollbar" @end-reached="loadMore" :distance="80">
        <div class="goods-list">
          <good-item v-for="good in itemList" :key="good.id" :good="good"></good-item>
        </div>
        <div v-if="isLoading" class="load-status">加载中...</div>
        <div v-else-if="!hasMore" class="load-status">没有更多了</div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryFilterById, getSubCategoryInfo, type SubCategoryPageDTO } from '@/apis/categoryApi';
import type { SubCategory } from '@/types/category';
import type { Good } from '@/types/good';
import type { PageResult } from '@/types/result';
import { onMounted, ref } from 'vue';
import GoodItem from '../Home/components/GoodItem.vue';
import type { ScrollbarDirection } from 'element-plus';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const subCategoryInfo = ref<SubCategory>();
const getSubCategories = async () => {
  const res = await getCategoryFilterById(props.id);
  console.log(`getSubCategories, res:`, res);
  subCategoryInfo.value = res.data.result;
};

const pageResult = ref<PageResult<Good>>();
const itemList = ref<Array<Good>>([]);
const isLoading = ref(false);
const hasMore = ref(true);
const params = ref<SubCategoryPageDTO>({
  categoryId: +props.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
});

const getSubCategory = async () => {
  isLoading.value = true;
  const res = await getSubCategoryInfo(params.value);
  console.log(`getSubCategory, res:`, res);
  pageResult.value = res.data.result;
  itemList.value = res.data.result.items;
  isLoading.value = false;
};

onMounted(() => {
  getSubCategories();
  getSubCategory();
});

const tabChange = () => {
  params.value.page = 1;
  getSubCategory();
};

const loadMore = async (direction: ScrollbarDirection) => {
  if (direction === 'bottom') {
    isLoading.value = true;
    params.value.page++;
    const res = await getSubCategoryInfo(params.value);
    pageResult.value = res.data.result;
    if (itemList.value && pageResult.value?.items) {
      itemList.value = [...itemList.value, ...pageResult.value.items];
    } else {
      hasMore.value = false;
    }
    isLoading.value = false;
  }
};
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
  .goods-scrollbar {
    height: 700px;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
  }

  .load-status {
    padding: 16px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
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
