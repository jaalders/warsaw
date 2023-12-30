<!-- 
  designs items to keep in mind 

  - item additions (bacon, cheese, etc)
  - is this a new item. (top corner) - TODO
-->

<template>
  <div class="product-card">
    <div class="product-body">
      <!-- TODO - Add is new product option -->
      <img
        :src="imageUrl"
        :class="{
          'top-left': imagePosition === 'top-left',
          'top-right': imagePosition === 'top-right',
        }"
        alt="Product Image"
      />
      <div class="product-details">
        <p>{{ title }}</p>
        <p class="float-right">{{ price }}</p>
        <p>{{ description }}</p>
        <div class="enhancements">
          <div
            v-for="(enhancement, index) in enhancements"
            :key="index"
            class="enhancement"
          >
            <div class="enhancement-details">
              <div style="line-break: anywhere">
                <span class="item">{{ enhancement.name }}</span>
                <span class="price">{{ enhancement.price }}</span>
              </div>
            </div>
          </div>
          <hr class="enhancement-separator" />
          <p class="calories">Calories: {{ calories }}</p>
          <div class="labels">
            <div style="line-break: anywhere">
              <span v-for="(label, index) in labels" :key="index" class="label">
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//const isNew = ref(true);
const title = ref('Product Title');
const description = ref(
  'Here is a product description with a long amount of text to showcase the bits of the dish'
);
const imageUrl = ref('https://placehold.co/100x100');
const imagePosition = ref('top-right');
const labels = ref(['Vegetarian', 'Vegan', 'Gluten Free', 'Keto Friendly']);
const calories = ref(500);
const price = ref(17);
const enhancements = ref([
  { name: 'Bacon', price: 1.0 },
  { name: 'Cheese', price: 1.0 },
  { name: 'Gluten-Free Bun really really really long text', price: 2.0 },
]);
</script>

<style scoped lang="scss">
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
}

.new-item {
  background-color: #4caf50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
}

.labels,
.calories,
.enhancements {
  margin-top: 0.5rem;
}

.label {
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
}

.enhancement-details > div {
  display: flex;
}

.price {
  flex-grow: 1;
  text-align: right;
  display: flex;
}

.price::before {
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
</style>
