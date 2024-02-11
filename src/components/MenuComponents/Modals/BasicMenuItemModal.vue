<template>
  <q-dialog v-model="isOpen" @hide="closeBasicMenuItemModal">
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
              v-model="menuItem.price"
              label="Menu Price"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />

            <q-space class="q-pa-md" />

            <q-btn label="Reset Menu Item" type="button" color="primary" @click="onReset" flat></q-btn>
            <q-btn label="Add Menu Item" type="submit" color="primary" class="float-right"></q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IMenuItem } from 'src/interfaces';
import { getNextID } from '../../../utilities/utilities';
import { ref, watch } from 'vue';

const isOpen = ref(false);

const props = defineProps({
  openBasicMenuItemModal: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  closeBasicMenuItemModal: [boolean];
  addMenuItem: [IMenuItem];
}>();

const menuItem = ref<IMenuItem>({
  id: getNextID(),
  title: '',
  menuItemTypeId: 1,
  price: undefined,
});

const closeBasicMenuItemModal = (): void => {
  isOpen.value = false;
  return emits('closeBasicMenuItemModal', false);
};

const onSubmit = async (): Promise<void> => {
  try {
    await emits('addMenuItem', menuItem.value);
    menuItem.value = <IMenuItem>{ menuItemTypeId: 2 };
    isOpen.value = false;
  } catch (error) {
    throw error;
  }
};

const onReset = (): IMenuItem => {
  return (menuItem.value = <IMenuItem>{});
};

watch(
  () => props.openBasicMenuItemModal,
  (newValue: boolean): boolean => {
    return (isOpen.value = newValue);
  }
);
</script>
