<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            :class="{ selected: val.selected }"
            @click="changeSelectedEvent(item, val)" />
          <!-- 文字类型规格 -->
          <span v-else :class="{ selected: val.selected }" @click="changeSelectedEvent(item, val)">{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { GoodDetail, Spec } from '@/types/goods';
import { axiosInstance } from '@/utils/http';
import { onMounted, ref } from 'vue';

const goods = ref<GoodDetail>();
const getGoods = async () => {
  // 1135076  初始化就有无库存的规格
  // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axiosInstance.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074');
  console.log('Sku, res:', res);
  goods.value = res.data.result;
};

function changeSelectedEvent(
  spec: Spec, // 同属性所有值
  val: {
    name: string;
    picture: string;
    desc: string;
    selected: boolean;
  },
) {
  if (val.selected) {
    val.selected = false;
  } else {
    spec.values.forEach(value => (value.selected = value === val ? true : false));
  }
}

onMounted(() => getGoods());
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
