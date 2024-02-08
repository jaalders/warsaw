<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-mb-md">
          <div class="row">
            <q-btn @click="toggleRightDrawer" icon="menu" class="q-ma-md" />
            <q-btn @click="decreaseRows" label="Decrease Rows" />
            <q-btn @click="increaseRows" label="Increase Rows" />
          </div>
          <div class="row">
            <div class="col-3">
              <div v-if="menuItems">
                <div v-for="index in menuItems" :key="index.id">
                  <AdvancedMenuItem :menuItemInfo="index" />
                </div>
              </div>
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
          </div>
        </div>

        <div class="q-mt-md">
          <div v-for="index in selectedColumns" :key="index" class="q-pa-md">
            <div
              @dragover.prevent
              @drop="openMenuItemsModal"
              :style="{
                marginTop: '20px',
                width: '400px',
                height: '200px',
                border: '2px solid #2ecc71',
              }"
            ></div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-list q-list padding class="text-primary">
        <q-item draggable="true">
          <q-item-section>
            <q-item-label> Basic Menu Item </q-item-label>
          </q-item-section>
        </q-item>
        <q-item draggable="true">
          <q-item-section>
            <q-item-label> Advanced Menu Item </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
  <AdvancedMenuItemModal
    :openAdvancedMenuItemModal="openAdvancedMenuItemModal"
    @closeAdvancedMenuItemModal="closeAdvancedMenuItemModal"
    @addMenuItem="addMenuItem"
  />
</template>

<style scoped lang="scss">
.draggable {
  cursor: grab;
  user-select: none;
  position: absolute;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}
</style>

<script setup lang="ts">
import { IMenuItem } from 'src/interfaces';
import { defineAsyncComponent, ref } from 'vue';
const { AdvancedMenuItem, AdvancedMenuItemModal } = {
  AdvancedMenuItem: defineAsyncComponent(() => import('../components/MenuComponents/AdvancedMenuItem.vue')),
  AdvancedMenuItemModal: defineAsyncComponent(() => import('../components/MenuComponents/AdvancedMenuItemModal.vue')),
};

const menuItems = ref<IMenuItem[]>([
  {
    id: 3,
    image: 'https://placehold.co/100x100',
    title: 'Product Info 3',
    description: 'Test Description 3',
    price: 15,
    calories: 500,
    itemAdditions: [
      { id: 998, name: 'Bacon', price: 1.0, added: true },
      { id: 997, name: 'Cheese', price: 1.0, added: true },
      {
        id: 995,
        name: 'Gluten-Free Bun really really really long text',
        price: 2.0,
        added: true,
      },
    ],
    dietaryOptions: [{ id: 1, name: 'Paleo' }],
  },
]);

const selectedColumns = ref(1);
const rightDrawerOpen = ref(false);
const openAdvancedMenuItemModal = ref(false);

const openMenuItemsModal = (): boolean => {
  return (openAdvancedMenuItemModal.value = true);
};

const closeAdvancedMenuItemModal = (): boolean => {
  return (openAdvancedMenuItemModal.value = !openAdvancedMenuItemModal.value);
};

const addMenuItem = (menuItem: IMenuItem): IMenuItem[] => {
  menuItems.value.push(menuItem);

  return menuItems.value;
};

const toggleRightDrawer = (): boolean => {
  return (rightDrawerOpen.value = !rightDrawerOpen.value);
};

const increaseRows = (): number | void => {
  if (selectedColumns.value >= 12) {
    return;
  }
  return (selectedColumns.value += 1);
};

const decreaseRows = (): number | void => {
  if (selectedColumns.value <= 1) {
    return;
  }
  return (selectedColumns.value -= 1);
};
</script>
