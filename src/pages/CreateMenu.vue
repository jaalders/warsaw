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
            <div class="col-6">
              <MenuItem
                :openMenuItemAddtionsModal="openMenuItemAddtionsModal"
                @closeMenuItemAdditionsModal="handlecloseMenuItemAdditionsModal"
              />
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
          </div>
        </div>

        <div class="q-mt-md">
          <div v-for="index in selectedColumns" :key="index" class="q-pa-md">
            <!-- DROPPABLE AREA -->
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
            <!-- DRAGGABLE AREA -->
            <q-item-label> Standard Menu Item </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
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
import { ref } from 'vue';
import MenuItem from '../components/MenuComponents/MenuItem.vue';

const selectedColumns = ref(1);
const rightDrawerOpen = ref(false);
const openMenuItemAddtionsModal = ref(false);

const openMenuItemsModal = () => {
  openMenuItemAddtionsModal.value = true;
};

const handlecloseMenuItemAdditionsModal = () => {
  openMenuItemAddtionsModal.value = !openMenuItemAddtionsModal.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const increaseRows = () => {
  if (selectedColumns.value >= 12) {
    return;
  }
  selectedColumns.value += 1;
};

const decreaseRows = () => {
  if (selectedColumns.value <= 1) {
    return;
  }
  selectedColumns.value -= 1;
};
</script>
