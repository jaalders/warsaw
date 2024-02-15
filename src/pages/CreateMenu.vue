<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-mb-md">
          <div class="row">
            <q-btn @click="toggleRightDrawer" icon="menu" class="q-ma-md" />
            <q-btn @click="increaseRows" label="Increase Rows" />
            <q-btn @click="decreaseRows" label="Decrease Rows" />
            <q-btn @click="increaseColumns" label="Increase Columns" />
            <q-btn @click="decreaseColumns" label="Decrease Columns" />
          </div>
          <div class="row">
            <div v-for="cols in columnCount" :key="cols" :class="`col-${inverseColumnCount}`">
              <p>col-2</p>
              <div @dragover.prevent @drop="openMenuItemsModal" style="height: 200px; border: 1px solid #2ecc71"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <div v-if="menuItems">
                <div v-for="menuItem in menuItems" :key="menuItem.id">
                  <template v-if="menuItem.menuItemTypeId === 1">
                    <BasicMenuItem :menuItemInfo="menuItem" />
                  </template>
                  <template v-else-if="menuItem.menuItemTypeId === 2">
                    <AdvancedMenuItem :menuItemInfo="menuItem" />
                  </template>
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

    <q-drawer show-if-above v-model="menuSettingsSidebar" side="right" bordered>
      <q-list q-list padding class="text-primary">
        <q-item-label class="text-center text-subtitle1" header
          >Drag elements below to begin adding menu items</q-item-label
        >
        <q-separator spaced />
        <q-item draggable="true" id="bMenuItem" @dragstart="dragstart">
          <q-item-section>
            <q-item-label> Basic Menu Item </q-item-label>
            <q-item-label caption>Add singular menu item. (label / price)</q-item-label>
          </q-item-section>
        </q-item>
        <q-item draggable="true" id="cMenuItem" @dragstart="dragstart">
          <q-item-section>
            <q-item-label> Basic Menu Item List </q-item-label>
            <q-item-label caption>Add multiple menu items listed together. (label / price)</q-item-label>
          </q-item-section>
        </q-item>
        <q-item draggable="true" id="aMenuItem" @dragstart="dragstart">
          <q-item-section>
            <q-item-label> Advanced Menu Item </q-item-label>
            <q-item-label caption
              >Add a menu item with options such as item additions and dietary restrictions</q-item-label
            >
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
  <BasicMenuItemModal
    :openBasicMenuItemModal="openBasicMenuItemModal"
    @closeBasicMenuItemModal="closeBasicMenuItemModal"
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
import { computed, defineAsyncComponent, ref } from 'vue';
const { BasicMenuItem, BasicMenuItemModal, AdvancedMenuItem, AdvancedMenuItemModal } = {
  AdvancedMenuItem: defineAsyncComponent(() => import('../components/MenuComponents/Templates/AdvancedMenuItem.vue')),
  AdvancedMenuItemModal: defineAsyncComponent(
    () => import('../components/MenuComponents/Modals/AdvancedMenuItemModal.vue')
  ),
  BasicMenuItem: defineAsyncComponent(() => import('../components/MenuComponents/Templates/BasicMenuItem.vue')),
  BasicMenuItemModal: defineAsyncComponent(() => import('../components/MenuComponents/Modals/BasicMenuItemModal.vue')),
};

const draggedElementId = ref('');

const menuItems = ref<IMenuItem[]>([
  {
    id: 3,
    image: 'https://placehold.co/100x100',
    title: 'Product Info 3',
    description: 'Test Description 3',
    menuItemTypeId: 2,
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
const menuSettingsSidebar = ref(false);
const openAdvancedMenuItemModal = ref(false);
const openBasicMenuItemModal = ref(false);
const openBasicItemListModal = ref(false);

const dragstart = (event: DragEvent) => {
  draggedElementId.value = '';
  const targetElement = event.target as HTMLElement;
  draggedElementId.value = targetElement.id;
};

const openMenuItemsModal = (): boolean => {
  if (draggedElementId.value === 'bMenuItem') {
    draggedElementId.value = '';
    openBasicMenuItemModal.value = true;
  } else if (draggedElementId.value === 'aMenuItem') {
    draggedElementId.value = '';
    openAdvancedMenuItemModal.value = true;
  } else if (draggedElementId.value === 'cMenuItem') {
    draggedElementId.value = '';
    openBasicItemListModal.value = true;
  }

  return openAdvancedMenuItemModal.value;
};

const closeBasicMenuItemModal = (): boolean => {
  return (openBasicMenuItemModal.value = false);
};

const closeAdvancedMenuItemModal = (): boolean => {
  return (openAdvancedMenuItemModal.value = false);
};

const addMenuItem = (menuItem: IMenuItem): IMenuItem[] => {
  menuItems.value.push(menuItem);
  return menuItems.value;
};

const toggleRightDrawer = (): boolean => {
  return (menuSettingsSidebar.value = !menuSettingsSidebar.value);
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

const columnCountOptions = [1, 2, 3, 4, 6, 12];
const columnCount = ref(columnCountOptions[5]);

const inverseColumnCount = computed(() => {
  const selectedValue = columnCount.value;
  return 12 / selectedValue;
});

const increaseColumns = (): number => {
  const currentIndex = columnCountOptions.indexOf(columnCount.value);
  if (currentIndex < columnCountOptions.length - 1) {
    columnCount.value = columnCountOptions[currentIndex + 1];
  }

  return columnCount.value;
};

const decreaseColumns = (): number => {
  const currentIndex = columnCountOptions.indexOf(columnCount.value);
  if (currentIndex > 0) {
    columnCount.value = columnCountOptions[currentIndex - 1];
  }

  return columnCount.value;
};
</script>
