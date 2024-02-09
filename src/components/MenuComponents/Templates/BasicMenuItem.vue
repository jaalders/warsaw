<!-- TODO: add "chef's special" focusing menu item -->
<template>
  <div class="product__card">
    <div class="product__body">
      <!-- TODO: - Add is new product option -->
      <div class="enhancement__details">
        <div style="line-break: anywhere">
          <span>{{ menuItemInfo.title }}</span>
          <span class="price">{{ menuItemInfo.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product__card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;

  .enhancement {
    margin-bottom: 0.25rem;

    &__details > div {
      display: flex;
    }
  }

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
import { IMenuItem } from '../../../interfaces';

defineProps({
  menuItemInfo: {
    type: Object as () => IMenuItem,
    required: true,
  },
});
</script>
