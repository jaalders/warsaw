<!-- TODO: add "chef's special" focusing menu item -->
<template>
  <div class="product__card">
    <div class="product__body">
      <!-- TODO: - Add is new product option -->
      <img
        :src="menuItem.image"
        :class="{
          'top-left': imagePosition === 'top-left',
          'top-right': imagePosition === 'top-right',
        }"
        alt="Product Image"
      />
      <div>
        <!-- TODO: fix this inline styling -->
        <p style="display: inline-block">{{ menuItem.title }}</p>
        <p style="display: inline-block; float: right">{{ menuItem.price }}</p>
        <p>{{ menuItem.description }}</p>
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
          <p class="calories">Calories: {{ menuItem.calories }}</p>
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

  <q-dialog v-model="isOpen" @hide="closeMenuItemAdditionsModal">
    <q-card style="width: 700px; max-width: 80vw">
      <div class="menu__form">
        <q-form class="q-gutter-md">
          <div class="q-pa-md">
            <q-input filled v-model="text" label="Menu Item Name" />
            <q-input filled v-model="text" label="Menu Item Description" />
            <q-input filled v-model="text" label="Menu Item Price" />
            <q-input filled v-model="text" label="Calories" />
            <!-- <q-checkbox v-model="text" />  -->
            <!-- TODO: add new product toggle -->

            <!-- form need to push to the array not reference the object. -->
            <q-input
              v-model="formItemAdditions.name"
              class="col"
              square
              filled
              placeholder="Add Menu Option Name"
              dense
            >
            </q-input>
            <q-input
              v-model="formItemAdditions.price"
              class="col"
              square
              filled
              placeholder="Add Menu Product Price"
              dense
            >
              <template v-slot:append>
                <q-btn
                  @click="addMenuProductOption"
                  round
                  dense
                  flat
                  :disable="!formItemAdditions.name"
                  icon="add"
                />
              </template>
            </q-input>

            <q-list separator bordered>
              <q-item
                v-for="(option, index) in itemAdditions"
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
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ option.name }}</q-item-label>
                </q-item-section>
                <q-btn
                  @click.stop="deleteMenuProductOption(index)"
                  flat
                  round
                  color="primary"
                  icon="delete"
                />
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
    </q-card>
  </q-dialog>
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
import { ref, watch } from 'vue';
import { IMenuItem, IMenuItemAdditions } from '../../interfaces/menus';

const props = defineProps({
  openMenuItemAddtionsModal: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  closeMenuItemAdditionsModal: [boolean];
}>();

const isOpen = ref(false);

const menuItem = ref<IMenuItem>({
  id: 1,
  image: 'https://placehold.co/100x100',
  title: 'Product Title',
  description:
    'Here is a product description with a long amount of text to showcase the bits of the dish',
  price: 17,
  calories: 500,
  itemAdditions: [],
  dietaryOptions: [],
});

const formItemAdditions = ref({
  name: '',
  price: 0,
  added: true,
});

const itemAdditions = ref<IMenuItemAdditions[]>([]);

const text = ref('');
const imagePosition = ref('top-right');
const dietaryOptions = ref([
  'Vegan',
  'Gluten Free',
  'Keto',
  'Dairy Free',
  'Paleo',
  'Nut Free',
]);

const menuItemEnhancements = ref([
  { name: 'Bacon', price: 1.0 },
  { name: 'Cheese', price: 1.0 },
  { name: 'Gluten-Free Bun really really really long text', price: 2.0 },
]);

watch(
  () => props.openMenuItemAddtionsModal,
  (newValue: boolean) => {
    isOpen.value = newValue;
  }
);

const addMenuProductOption = () => {
  itemAdditions.value.push({
    name: formItemAdditions.value.name,
    price: formItemAdditions.value.price,
    added: true,
  });

  console.log(itemAdditions.value);
};

const deleteMenuProductOption = (index: number) => {
  itemAdditions.value.splice(index, 1);
};

const closeMenuItemAdditionsModal = () => {
  isOpen.value = false;
  emits('closeMenuItemAdditionsModal', false);
};
</script>
