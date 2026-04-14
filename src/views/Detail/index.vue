<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodDetails">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goodDetails.categories[1]?.id}` }">
            {{ goodDetails.categories[1]?.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goodDetails.categories[0]?.id}` }"
            >{{ goodDetails.categories[0]?.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goodDetails.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :image-list="goodDetails.mainPictures" />

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ goodDetails.salesCount }}</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goodDetails.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goodDetails.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goodDetails.brand?.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name">{{ goodDetails.name }}</p>
              <p class="g-desc">{{ goodDetails.desc }}</p>
              <p class="g-price">
                <span>{{ goodDetails.price }}</span>
                <span>{{ goodDetails.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goodDetails" @change="skuChangeHandler" />
              <!-- 数据组件 -->
              <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addToCart"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="property in goodDetails.details.properties" :key="property.value">
                      <span class="dt">{{ property.name }}</span>
                      <span class="dd">{{ property.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="image in goodDetails.details.pictures" :key="image" :src="image" />
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <h3>24h热榜</h3>
              <good-item v-for="good in hotDayList" :key="good.id" :good="good"> </good-item>
              <h3>本周热榜</h3>
              <good-item v-for="good in hotWeekList" :key="good.id" :good="good"> </good-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDetail, getHotList } from '@/apis/detailApi';
import type { Goods, GoodDetail, Sku } from '@/types/goods';
import { onMounted, ref } from 'vue';
import GoodItem from '../components/GoodItem.vue';
import { ElMessage } from 'element-plus';
import { useCartStore } from '@/stores/cartStore';
import type { CartItem } from '@/types/cart';

enum HotType {
  Day = 1,
  Week = 2,
}

const goodDetails = ref<GoodDetail>();
const hotDayList = ref<Array<Goods>>();
const hotWeekList = ref<Array<Goods>>();
const num = ref(1);
const sku = ref<Sku>();
const cartStore = useCartStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

async function getGoodDetail() {
  const res = await getDetail(props.id);
  console.log(`getGoodDetail res:`, res);
  goodDetails.value = res.data.result;
}

async function initHotList(limit?: number) {
  const map = new Map();
  map.set(HotType.Day, hotDayList);
  map.set(HotType.Week, hotWeekList);
  for (const [type, list] of map) {
    const res = await getHotList(props.id, type, limit);
    console.log(`getHotList type ${type} res:`, res);
    list.value = res.data.result;
  }
}

function skuChangeHandler(value: Sku) {
  console.log(`skuChangeHandler sku:`, value);
  sku.value = value;
}

const handleChange = (value: number | undefined) => {
  console.log(value);
};

function addToCart() {
  if (sku.value?.skuId) {
    ElMessage.success('成功加入购物车！');
    const cartItem: CartItem = {
      id: goodDetails.value!.id,
      name: goodDetails.value!.name,
      picture: goodDetails.value!.mainPictures[0]!,
      price: goodDetails.value!.price,
      count: num.value,
      skuId: sku.value.skuId,
      attrsText: sku.value.specsText!,
      selected: true,
    };
    cartStore.addItem(cartItem);
  } else {
    ElMessage.warning('请选择商品规格！');
  }
}

onMounted(() => {
  getGoodDetail();
  initHotList(8);
});
</script>

<style scoped lang="scss">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;

      h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
      }
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: '¥';
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: '•';
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
</style>
