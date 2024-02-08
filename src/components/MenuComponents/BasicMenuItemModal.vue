<template>
  <q-dialog v-model="isOpen" @hide="closeBasicMenuItemModal">
    <q-card style="width: 700px; max-width: 80vw">
      <div class="menu__form">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset"> </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IMenuItem } from 'src/interfaces';
import { getNextID } from '../../utilities/utilities';
import { ref } from 'vue';

const isOpen = ref(false);

const emits = defineEmits<{
  closeBasicMenuItemModal: [boolean];
  addBasicMenuItem: [IMenuItem];
}>();

const menuItem = ref<IMenuItem>({
  id: getNextID(),
  title: '',
  price: undefined,
});

const closeBasicMenuItemModal = (): void => {
  isOpen.value = false;
  return emits('closeBasicMenuItemModal', false);
};

const onSubmit = (): void => {
  isOpen.value = false;
  return emits('addBasicMenuItem', menuItem.value);
};

const onReset = (): IMenuItem => {
  return (menuItem.value = <IMenuItem>{});
};
</script>
