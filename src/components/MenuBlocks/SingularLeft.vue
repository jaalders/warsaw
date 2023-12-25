<!-- <template>
  <div>
    <img src="https://placehold.co/50x50" /> -->
<!-- 
  designs items to keep in mind 
  - name of product
  - price right beside it
  - descriptions
  - labels for gluten free/vegan etc if applicable
  - calories for item if applicable.
  - item additions (bacon, cheese, etc)
  - is this a new item. (top corner)
-->
<!-- </div>
</template> -->

<!-- <script setup lang="ts"></script> -->

<template>
  <div class="product-card">
    <div class="product-header">
      <h2>{{ title }}</h2>
      <div class="new-item" v-if="isNew">
        <span class="new-label">New</span>
      </div>
    </div>
    <div class="product-body">
      <img
        :src="imageUrl"
        :class="{
          'top-left': imagePosition === 'top-left',
          'top-right': imagePosition === 'top-right',
        }"
        alt="Product Image"
      />
      <div class="product-details">
        <p>{{ description }}</p>
        <div class="labels">
          <span v-for="(label, index) in labels" :key="index" class="label">
            {{ label }}
          </span>
        </div>
        <p class="calories">Calories: {{ calories }}</p>
        <div class="enhancements">
          <div
            v-for="(enhancement, index) in enhancements"
            :key="index"
            class="enhancement"
          >
            <div class="enhancement-details">
              <span>{{ enhancement.name }}</span>
              <span class="dots">{{
                calculateDots(enhancement.name.length)
              }}</span>

              <span class="price">{{ enhancement.price.toFixed(2) }}</span>
            </div>
          </div>
          <hr class="enhancement-separator" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Product Title');
const description = ref('Product Description');
const imageUrl = ref('https://placehold.co/100x100');
const imagePosition = ref('top-right');
const labels = ref(['Vegetarian', 'Vegan', 'Gluten Free', 'Keto Friendly']);
const calories = ref(500);
const enhancements = ref([
  { name: 'Bacon', price: 1.0 },
  { name: 'Cheese', price: 1.0 },
  { name: 'Gluten-Free Bun', price: 2.0 },
]);

const isNew = ref(false);

const calculateDots = (length) => '.'.repeat(maxDots.value - length);
const maxDots = ref(Math.max(...enhancements.value.map((e) => e.name.length)));
</script>

<style scoped lang="scss">
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-item {
  background-color: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.new-label {
  font-size: 12px;
}

.product-body {
  display: flex;
  margin-top: 16px;
}

.product-details {
  margin-left: 16px;
}

img {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.labels {
  margin-top: 8px;
}

.label {
  background-color: #2196f3;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: 8px;
  font-size: 12px;
}

.calories {
  margin-top: 8px;
}

.enhancements {
  margin-top: 8px;
}

.enhancement {
  justify-content: space-between;
  margin-bottom: 4px;
}

.enhancement-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dots {
  white-space: nowrap;
}

.price {
  text-align: right;
}
</style>
