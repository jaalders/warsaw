<template>
  <div class="product__card">
    <div class="product__body">
      <!-- TODO: - Add is new product option -->
      <img
        :src="imageUrl"
        :class="{
          'top-left': imagePosition === 'top-left',
          'top-right': imagePosition === 'top-right',
        }"
        alt="Product Image"
      />
      <div>
        <!-- TODO: fix this inline styling -->
        <p style="display: inline-block">{{ title }}</p>
        <p style="display: inline-block; float: right">{{ price }}</p>
        <p>{{ description }}</p>
        <div class="menu__item__enhancements">
          <div
            v-for="(enhancement, index) in menuItemEnhancements"
            :key="index"
            class="enhancement"
          >
            <div class="enhancement__details">
              <div style="line-break: anywhere">
                <span class="item">{{ enhancement.name }}</span>
                <span class="price">{{ enhancement.price }}</span>
              </div>
            </div>
          </div>
          <hr />
          <p class="calories">Calories: {{ calories }}</p>
          <div class="labels">
            <div style="line-break: anywhere">
              <span
                v-for="(option, index) in dietaryOptions"
                :key="index"
                class="dietary__options"
              >
                {{ option }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="menu__form" v-if="showMenuSetup">
    <q-form class="q-gutter-md">
      <div class="q-pa-md">
        <q-input filled v-model="text" label="Item Name" />
        <q-input filled v-model="text" label="Item Description" />
        <q-input filled v-model="text" label="Item Price" />
        <q-input filled v-model="text" label="Calories" />
        <!-- <q-checkbox v-model="text" />  -->
        <!-- TODO: add new product toggle -->

        <q-input
          v-model="newMenuProductOption"
          @keyup.enter="addMenuProductOption"
          class="col"
          square
          filled
          placeholder="Add Menu Product Option"
          dense
        >
          <template v-slot:append>
            <q-btn @click="addMenuProductOption" round dense flat icon="add" />
          </template>
        </q-input>

        <q-list separator bordered>
          <q-item
            v-for="(option, index) in menuProductOptions"
            :key="option.name"
            @click="option.added = !option.added"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="option.added"
                class="no-pointer-events"
                color="primary"
              />
              <q-btn
                @click.stop="deleteMenuProductOption(index)"
                flat
                round
                dense
                color="primary"
                icon="delete"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ option.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
.product__card {
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
.menu__item__enhancements {
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
}

.enhancement__details > div {
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

<script setup lang="ts">
import { ref } from 'vue';
import { IMenuItemAdditions } from '../../interfaces/menus';

const title = ref('Product Title');
const description = ref(
  'Here is a product description with a long amount of text to showcase the bits of the dish'
);

const newMenuProductionOptionPrice = ref(0);
const newMenuProductOption = ref('');
const menuProductOptions = ref<IMenuItemAdditions[]>([]);
const text = ref('');
const imageUrl = ref('https://placehold.co/100x100');
const imagePosition = ref('top-right');
const dietaryOptions = ref([
  'Vegan',
  'Gluten Free',
  'Keto',
  'Dairy Free',
  'Paleo',
  'Nut Free',
]);
const calories = ref(500);
const price = ref(17);
const menuItemEnhancements = ref([
  { name: 'Bacon', price: 1.0 },
  { name: 'Cheese', price: 1.0 },
  { name: 'Gluten-Free Bun really really really long text', price: 2.0 },
]);
const showMenuSetup = ref(true);

const addMenuProductOption = () => {
  menuProductOptions.value.push({
    name: newMenuProductOption.value,
    price: newMenuProductionOptionPrice.value,
    added: true,
  });
  newMenuProductOption.value = '';
};

const deleteMenuProductOption = (index: number) => {
  menuProductOptions.value.splice(index, 1);
};
</script>
