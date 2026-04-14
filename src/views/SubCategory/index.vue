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
      <!-- 商品列表-->
      <!-- 1. v-infinite-scroll 实现无限滚动 -->
      <!-- <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="100">
        <good-item v-for="good in itemList" :key="good.id" :good="good"></good-item>
      </div> -->

      <!-- 2. el-scrollbar 实现无限滚动 -->
      <el-scrollbar @end-reached="loadMore" noresize="true" view-class="body" distance="80">
        <good-item v-for="good in itemList" :key="good.id" :good="good"></good-item>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryFilterById, getSubCategoryInfo, type SubCategoryPageDTO } from '@/apis/categoryApi';
import type { SubCategory } from '@/types/category';
import type { Goods } from '@/types/goods';
import type { PageResult } from '@/types/result';
import { onMounted, ref } from 'vue';
import GoodItem from '../components/GoodItem.vue';
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

const pageResult = ref<PageResult<Goods>>();
const itemList = ref<Array<Goods>>([]);
const disabled = ref(false);
const params = ref<SubCategoryPageDTO>({
  categoryId: +props.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
});

const getSubCategory = async () => {
  const res = await getSubCategoryInfo(params.value);
  console.log(`getSubCategory, res:`, res);
  pageResult.value = res.data.result;
  itemList.value = res.data.result.items;
};

onMounted(() => {
  getSubCategories();
  getSubCategory();
  // 首次主动加载一页
  loadMore('bottom');
});

const tabChange = () => {
  params.value.page = 1;
  getSubCategory();
};

const load = async () => {
  params.value.page++;
  const res = await getSubCategoryInfo(params.value);
  pageResult.value = res.data.result;
  if (itemList.value && pageResult.value?.items && pageResult.value.items.length > 0) {
    itemList.value = [...itemList.value, ...pageResult.value.items];
  } else {
    disabled.value = true;
  }
};

const loadMore = async (direction: ScrollbarDirection) => {
  if (direction === 'bottom' && !disabled.value) {
    params.value.page++;
    const res = await getSubCategoryInfo(params.value);
    pageResult.value = res.data.result;
    if (itemList.value && pageResult.value?.items && pageResult.value.items.length > 0) {
      itemList.value = [...itemList.value, ...pageResult.value.items];
    } else {
      disabled.value = true;
    }
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

  :deep(.body) {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    max-height: 1500px;
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
