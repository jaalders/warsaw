<!-- TODO: add "chef's special" focusing menu item -->
<template>
  <div class="product__card">
    <div class="product__body">
      <!-- TODO: - Add is new product option -->
      <img
        :src="menuItemInfo.image"
        :class="{
          'top-left': imagePosition === 'top-left',
          'top-right': imagePosition === 'top-right',
        }"
        alt="Product Image"
      />
      <div>
        <p class="inline">{{ menuItemInfo.title }}</p>
        <p class="inline float-right">
          {{ menuItemInfo.price }}
        </p>
        <p>{{ menuItemInfo.description }}</p>
        <div class="menu__item__enhancements">
          <div v-for="(enhancement, index) in menuItemInfo.itemAdditions" :key="index" class="enhancement">
            <span class="enhancement__details">
              <div style="line-break: anywhere">
                <span>{{ enhancement.name }}</span>
                <span class="price">{{ enhancement.price }}</span>
              </div>
            </span>
          </div>
          <hr />
          <p class="calories">Calories: {{ menuItemInfo.calories }}</p>
          <div class="labels">
            <div style="line-break: anywhere">
              <span v-for="(option, index) in menuItemInfo.dietaryOptions" :key="index" class="dietary__options">
                {{ option.name }}
              </span>
            </div>
          </div>
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

  &.new-item {
    background-color: #4caf50;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
  }

  &.labels,
  &.calories,
  &.menu__item__enhancements {
    margin-top: 0.5rem;
  }

  .dietary__options {
    background-color: #2196f3;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;
    font-size: 0.75rem;
    white-space: nowrap;
    display: inline-block;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }

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

  .inline {
    display: inline-block;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { IMenuItem } from '../../../interfaces';

defineProps({
  menuItemInfo: {
    type: Object as () => IMenuItem,
    required: true,
  },
});

const imagePosition = ref('top-right');
</script>
