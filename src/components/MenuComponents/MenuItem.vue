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
        <!-- TODO: fix this inline styling -->
        <p style="display: inline-block">{{ menuItemInfo.title }}</p>
        <p style="display: inline-block; float: right">
          {{ menuItemInfo.price }}
        </p>
        <p>{{ menuItemInfo.description }}</p>
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
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
          <div class="q-pa-md">
            <q-input filled v-model="menuItem.title" label="Menu Item Name" />
            <q-input
              filled
              v-model="menuItem.description"
              label="Menu Item Description"
            />
            <q-input
              filled
              v-model.number="menuItem.price"
              label="Menu Item Price"
            />
            <q-input
              filled
              type="number"
              v-model.number="menuItem.calories"
              label="Calories"
            />
            <!-- <q-checkbox v-model="text" />  -->
            <!-- TODO: add new product toggle -->

            <!-- form need to push to the array not reference the object. -->
            <div class="q-pa-md"></div>
            <p class="q-field-control item-start">Add menu item additions</p>
            <div class="q-gutter-md row items-start">
              <q-input
                v-model="formItemAdditions.name"
                class="col"
                round
                dense
                flat
                filled
                placeholder="Add Menu Option Name"
              >
              </q-input>
              <q-input
                v-model.number="formItemAdditions.price"
                class="col"
                round
                dense
                flat
                filled
                type="number"
                placeholder="Add Menu Product Price"
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
            </div>
            <q-separator vertical inset />

            <q-list v-if="menuItem.itemAdditions" separator bordered>
              <q-item
                v-for="(option, index) in menuItem.itemAdditions"
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
                  <q-item-label
                    >{{ option.name }} ..... {{ option.price }}</q-item-label
                  >
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
            <q-btn
              label="Reset Item Additions"
              type="button"
              color="primary"
              @click="resetMenuItemAdditions"
            />
            <q-separator vertical inset />

            <q-btn label="Submit" type="button" color="primary" />
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
  menuItemInfo: {
    type: Object as () => IMenuItem,
    required: true,
  },
});

const emits = defineEmits<{
  closeMenuItemAdditionsModal: [boolean];
}>();

const isOpen = ref(false);

const menuItem = ref<IMenuItem>({
  id: localStorage.id
    ? parseInt(JSON.parse(localStorage.id))
    : (localStorage.setItem('id', '1'), 1),
  image: 'https://placehold.co/100x100',
  title: 'Product Title',
  description:
    'Here is a product description with a long amount of text to showcase the bits of the dish',
});

const menuItemCollection = ref<IMenuItem[]>([]);

const formItemAdditions = ref<IMenuItemAdditions>({
  name: '',
  price: 0,
  added: true,
});

const imagePosition = ref<string>('top-right');
const dietaryOptions = ref<string[]>([
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
  (newValue: boolean): boolean => {
    return (isOpen.value = newValue);
  }
);

const addMenuProductOption = (): IMenuItemAdditions[] => {
  // if this is null or undefined, initialize to a empty array first.
  menuItem.value.itemAdditions ??= [];
  menuItem.value.itemAdditions.push({
    name: formItemAdditions.value.name,
    price: formItemAdditions.value.price,
    added: true,
  });

  formItemAdditions.value = <IMenuItemAdditions>{};

  return menuItem.value.itemAdditions;
};

const deleteMenuProductOption = (
  index: number
): IMenuItemAdditions[] | undefined => {
  return menuItem.value.itemAdditions?.splice(index, 1);
};

const closeMenuItemAdditionsModal = (): void => {
  isOpen.value = false;
  return emits('closeMenuItemAdditionsModal', false);
};

const onSubmit = () => {
  alert(1);
};

const onReset = (): IMenuItem => {
  return (menuItem.value = <IMenuItem>{});
};

const resetMenuItemAdditions = (): IMenuItemAdditions[] => {
  return (menuItem.value.itemAdditions = <IMenuItemAdditions[]>{});
};
</script>
