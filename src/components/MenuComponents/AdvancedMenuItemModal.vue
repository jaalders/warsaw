<template>
  <q-dialog v-model="isOpen" @hide="closeAdvancedMenuItemModal">
    <q-card style="width: 700px; max-width: 80vw">
      <div class="menu__form">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
          <div class="q-pa-md">
            <q-input
              filled
              v-model="menuItem.title"
              label="Menu Item Name"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              filled
              v-model="menuItem.image"
              label="Menu Item Image URL"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              filled
              v-model="menuItem.description"
              label="Menu Item Description"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              filled
              v-model.number="menuItem.price"
              label="Menu Item Price"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input filled type="number" v-model.number="menuItem.calories" label="Calories" dense />
            <!-- TODO: add new product toggle -->

            <q-space class="q-pa-md" />

            <p class="q-field-control item-start">Add menu item additions:</p>
            <div class="q-gutter-md row items-start">
              <q-input
                v-model="formItemAdditions.name"
                class="col"
                round
                dense
                flat
                filled
                placeholder="Menu Item Addition Name"
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
                placeholder="Menu Item Addition Price"
              >
                <template v-slot:append>
                  <q-btn
                    @click="addMenuProductOption"
                    round
                    dense
                    flat
                    :disable="!formItemAdditions.name && !formItemAdditions.price"
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
                  <q-checkbox v-model="option.added" class="no-pointer-events" color="primary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ option.name }} ..... {{ option.price }}</q-item-label>
                </q-item-section>
                <q-btn @click.stop="deleteMenuProductOption(index)" flat round color="primary" icon="delete" />
              </q-item>
            </q-list>

            <q-space class="q-pa-md" />

            <p class="q-field-control item-start">Add menu item dietary options (ie: vegetarian)</p>
            <q-select
              filled
              v-model="menuItem.dietaryOptions"
              multiple
              :options="dietaryOptions"
              use-chips
              map-options
              option-label="name"
              option-value="id"
              dense
              label="Dietary Options"
            />

            <q-space class="q-pa-md" />

            <q-btn
              label="Reset Menu Item Additions"
              type="button"
              color="primary"
              @click="resetMenuItemAdditions"
              flat
            ></q-btn>
            <q-btn label="Reset Menu Item" type="reset" color="primary" flat></q-btn>
            <q-btn label="Add Menu Item" type="submit" color="primary" class="float-right"></q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IMenuDietaryOptions, IMenuItem, IMenuItemAdditions } from 'src/interfaces';
import { ref, watch } from 'vue';
import { getNextID } from '../../utilities/utilities';

const props = defineProps({
  openAdvancedMenuItemModal: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  closeAdvancedMenuItemModal: [boolean];
  addAdvancedMenuItem: [IMenuItem];
}>();

const isOpen = ref(false);

const dietaryOptions: IMenuDietaryOptions[] = [
  { id: 1, name: 'Dairy Free' },
  { id: 2, name: 'Gluten Free' },
  { id: 3, name: 'Keto' },
  { id: 4, name: 'Nut Free' },
  { id: 5, name: 'Paleo' },
  { id: 6, name: 'Vegan' },
  { id: 7, name: 'Vegetarian' },
];

// TODO: - fix ID sequencing
const menuItem = ref<IMenuItem>({
  id: getNextID(),
  image: '',
  title: '',
  menuItemTypeId: 2,
  price: undefined,
  description: '',
});

// TODO: - fix ID sequencing
const formItemAdditions = ref<IMenuItemAdditions>({
  id: getNextID(),
  name: '',
  price: undefined,
  added: false,
});

// TODO: - fix ID sequencing
const addMenuProductOption = (): IMenuItemAdditions[] => {
  // if this is null or undefined, initialize to a empty array first.
  menuItem.value.itemAdditions ??= [];
  menuItem.value.itemAdditions.push({
    id: getNextID(),
    name: formItemAdditions.value.name,
    price: formItemAdditions.value.price,
    added: true,
  });

  formItemAdditions.value = <IMenuItemAdditions>{};

  return menuItem.value.itemAdditions;
};

const deleteMenuProductOption = (index: number): IMenuItemAdditions[] | undefined => {
  return menuItem.value.itemAdditions?.splice(index, 1);
};

const closeAdvancedMenuItemModal = (): void => {
  isOpen.value = false;
  menuItem.value = <IMenuItem>{};
  return emits('closeAdvancedMenuItemModal', false);
};

const onSubmit = (): void => {
  isOpen.value = false;
  return emits('addAdvancedMenuItem', menuItem.value);
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
