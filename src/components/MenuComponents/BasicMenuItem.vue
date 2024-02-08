<template>
  <div class="product__card">
    <div class="product__body">
      <div class="menu__item__enhancements">
        <div v-for="(enhancement, index) in menuItemInfo.itemAdditions" :key="index" class="enhancement">
          <div class="enhancement__details">
            <div style="line-break: anywhere">
              <span class="item">{{ enhancement.name }}</span>
              <span class="price">{{ enhancement.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product__card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;

  .price {
    flex-grow: 1;
    text-align: right;
    display: flex;

    &::before {
      content: '';
      background: repeating-linear-gradient(
        to right,
        currentColor,
        currentColor 0.0625rem,
        transparent 0.125rem,
        transparent 0.25rem
      );
      height: 0.0625rem;
      flex-grow: 1;
      display: inline-block;
      margin: 1rem 0.4rem 0 0.4rem;
    }
  }
}
</style>

<script setup lang="ts">
import { IMenuItem } from '../../interfaces/menus';

defineProps({
  menuItemInfo: {
    type: Object as () => IMenuItem,
    required: true,
  },
});
</script>
