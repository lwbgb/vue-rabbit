<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="value in item.values" :key="value.name">
          <!-- 图片类型规格 -->
          <img
            v-if="value.picture"
            :src="value.picture"
            :title="value.name"
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="changeSelectedEvent(item, value)" />
          <!-- 文字类型规格 -->
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="changeSelectedEvent(item, value)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { GoodDetail, Sku, Spec, SpecValue } from '@/types/goods';
import { axiosInstance } from '@/utils/http';
import { computed, onMounted, ref } from 'vue';
import bwPowerSet from './power-set';

// const goods = ref<GoodDetail>();
const pathMap = ref<Map<string, Array<number>>>();
const { goods } = defineProps<{
  goods: GoodDetail;
}>();
const emit = defineEmits<{
  change: [value: Sku];
}>();

const specArray = computed(() => {
  const specArraySnap: Array<string | undefined> = [];
  goods.specs.forEach(spec => {
    const specName = spec.values.find(value => value.selected)?.name;
    specName ? specArraySnap.push(specName) : specArraySnap.push(undefined);
  });
  return specArraySnap;
});

// const getGoods = async () => {
//   // 1135076  初始化就有无库存的规格
//   // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
//   const res = await axiosInstance.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074');
//   console.log('Sku, res:', res);
//   goods.value = res.data.result;
// };

function changeSelectedEvent(spec: Spec, val: SpecValue) {
  // 如果规格被禁用则无法点击
  if (val.disabled) {
    return;
  }

  if (val.selected) {
    val.selected = false;
  } else {
    spec.values.forEach(value => (value.selected = value.name === val.name ? true : false));
  }

  console.log('specArray: ', specArray.value);
  // 更新禁用状态
  updateSpecStatus();

  if (specArray.value.every(spec => spec)) {
    console.log('商品规格完整');
    const path = specArray.value.join('-');
    const skuId = pathMap.value?.get(path)?.[0];
    const sku = goods.skus.find(sku => sku.id === skuId);
    if (sku) {
      sku.skuId = sku.id;
      sku.specsText = sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim();
      emit('change', sku);
    }
  }
}

function updateSpecStatus() {
  // 预测下一次所有可能点击的位置，判断可行性
  goods.specs.forEach((spec, index) => {
    // 深拷贝
    const specArraySnap = structuredClone(specArray.value);
    spec.values.forEach(value => {
      specArraySnap[index] = value.name;
      const path = specArraySnap.filter(spec => spec).join('-');
      value.disabled = !pathMap.value?.has(path);
    });
  });
}

/**
 * 生成有效组合的 skuId 映射图
 * @param goods
 */
function generatePathMap(goods: GoodDetail): Map<string, Array<number>> {
  const pathMap: Map<string, Array<number>> = new Map();
  // 1. 过滤无效的 sku
  const effectiveSkus = goods.skus.filter(sku => sku.inventory > 0);
  // 2. 根据有效的 sku 生成可能的搭配
  effectiveSkus.forEach(sku => {
    // 获取 spec 属性集合
    const specValueSet = sku.specs.map(spec => spec.valueName);
    // 根据集合获取构成的子集
    const skuSubSets = bwPowerSet<string>(specValueSet);
    // 构建 <有效组合,skuId> 的 Map
    skuSubSets.forEach(subset => {
      const path = subset.join('-');
      if (pathMap.has(path)) {
        pathMap.get(path)?.push(sku.id);
      } else {
        pathMap.set(path, [sku.id]);
      }
    });
  });
  return pathMap;
}

onMounted(async () => {
  // await getGoods();
  if (goods) {
    pathMap.value = generatePathMap(goods);
    console.log('pathMap: ', pathMap.value);
    // 初始化
    updateSpecStatus();
  }
});
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
