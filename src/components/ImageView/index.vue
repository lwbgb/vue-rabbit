<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" v-mouse-in-element="onMouseInElement">
      <img :src="imageList[activeIndex]" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!disabled" :style="{ left: `${pos.left}px`, top: `${pos.top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="imageChangeHandler(i)"
        :class="{ active: activeIndex === i }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div
      class="large"
      :style="{
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${-pos.left * 2}px`,
        backgroundPositionY: `${-pos.top * 2}px`,
      }"
      v-show="!disabled"></div>
  </div>
</template>

<script setup lang="ts">
import type { MouseInElementType } from '@/types/vueUse';
import { vMouseInElement } from '@vueuse/components';
import { ref } from 'vue';

const { imageList } = defineProps<{
  imageList: Array<string>;
}>();

const activeIndex = ref(0);
const pos = ref<{ left: number; top: number }>({ left: 0, top: 0 });
const disabled = ref(true);
const glassSize = { width: 200, height: 200 };

function imageChangeHandler(index: number) {
  activeIndex.value = index;
}

function onMouseInElement(event: MouseInElementType) {
  const { elementX, elementY, isOutside } = event;
  disabled.value = isOutside;

  if (!pos.value || isOutside) {
    return;
  }

  if (elementX < glassSize.width / 2) {
    pos.value.left = 0;
  } else if (elementX > 400 - glassSize.width / 2) {
    pos.value.left = glassSize.width;
  } else {
    pos.value.left = elementX - glassSize.width / 2;
  }
  if (elementY < glassSize.height / 2) {
    pos.value.top = 0;
  } else if (elementY > 400 - glassSize.height / 2) {
    pos.value.top = glassSize.height;
  } else {
    pos.value.top = elementY - glassSize.height / 2;
  }
}
</script>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
