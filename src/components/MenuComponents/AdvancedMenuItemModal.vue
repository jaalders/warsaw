<template>
  <q-dialog v-model="isOpen" @hide="closeAdvancedMenuItemModal">
    <q-card style="width: 700px; max-width: 80vw">
      <div class="menu__form">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
          <div class="q-pa-md">
            <q-input
              filled
              v-model="menuItem.image"
              label="Menu Item Image URL"
            />
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

            <q-space class="q-pa-md" />

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

            <q-space class="q-pa-md" />

            <p class="q-field-control item-start">
              Add menu item dietary options
            </p>
            <q-select
              filled
              v-model="menuItem.dietaryOptions"
              multiple
              :options="dietaryOptions"
              use-chips
              emit-value
              map-options
              label="Dietary Options ie: Vegetarian"
            />

            <q-space class="q-pa-md" />

            <q-btn
              label="Reset Menu Item Additions"
              type="button"
              color="primary"
              @click="resetMenuItemAdditions"
              flat
            />

            <q-btn label="Reset Menu Item" type="reset" color="primary" flat />
            <q-btn label="Add Menu Item" type="button" color="primary" flat />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  IMenuDietaryOptions,
  IMenuItem,
  IMenuItemAdditions,
} from 'src/interfaces';
import { ref, watch } from 'vue';

const props = defineProps({
  openAdvancedMenuItemModal: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  closeAdvancedMenuItemModal: [boolean];
}>();

const isOpen = ref(false);

const getNextID = (): number => {
  const storedID = localStorage.getItem('id');

  if (storedID === null) {
    localStorage.setItem('id', '1');
    return 1;
  } else {
    const id = parseInt(storedID);
    const nextID = id + 1;
    localStorage.setItem('id', nextID.toString());
    return nextID;
  }
};

const dietaryOptions: IMenuDietaryOptions[] = [
  { value: 1, label: 'Dairy Free' },
  { value: 2, label: 'Gluten Free' },
  { value: 3, label: 'Keto' },
  { value: 4, label: 'Nut Free' },
  { value: 5, label: 'Paleo' },
  { value: 6, label: 'Vegan' },
  { value: 7, label: 'Vegetarian' },
];

const menuItem = ref<IMenuItem>({
  id: getNextID(),
  image: '',
  title: '',
  description: '',
});

const menuItemCollection = ref<IMenuItem[]>([]);

const formItemAdditions = ref<IMenuItemAdditions>({
  id: 1,
  name: '',
  price: undefined,
  added: false,
});

const addMenuProductOption = (): IMenuItemAdditions[] => {
  // if this is null or undefined, initialize to a empty array first.
  menuItem.value.itemAdditions ??= [];
  menuItem.value.itemAdditions.push({
    id: 1,
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

const closeAdvancedMenuItemModal = (): void => {
  isOpen.value = false;
  return emits('closeAdvancedMenuItemModal', false);
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

watch(
  () => props.openAdvancedMenuItemModal,
  (newValue: boolean): boolean => {
    return (isOpen.value = newValue);
  }
);
</script>
