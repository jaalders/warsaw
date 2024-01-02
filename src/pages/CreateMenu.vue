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
              <MenuItem />
            </div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
          </div>
        </div>

        <div class="q-mt-md">
          <div v-for="index in selectedColumns" :key="index" class="q-pa-md">
            Column {{ index }}
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="draggable"
        :style="{ transform: `translate(${item.x}px, ${item.y}px)` }"
        @mousedown="startDragging(index, $event)"
      >
        Drag me {{ index + 1 }}!
      </div>
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
import { onMounted, ref } from 'vue';
import { DraggableItem } from '../interfaces';
import MenuItem from '../components/MenuBlocks/MenuItem.vue';

const items = ref<DraggableItem[]>([]);
let offsetX = 0;
let offsetY = 0;
const gridSize = 50;

const selectedColumns = ref(1);
const rightDrawerOpen = ref(false);

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

const startDragging = (index: number, e: MouseEvent) => {
  items.value[index].isDragging = true;
  offsetX = e.clientX - items.value[index].x;
  offsetY = e.clientY - items.value[index].y;

  window.addEventListener('mousemove', (ev) => handleDragging(ev, index));
  window.addEventListener('mouseup', () => stopDragging(index));
};

const handleDragging = (e: MouseEvent, index: number) => {
  if (items.value[index].isDragging) {
    items.value[index].x = snapToGrid(e.clientX - offsetX, gridSize);
    items.value[index].y = snapToGrid(e.clientY - offsetY, gridSize);
  }
};

const stopDragging = (index: number) => {
  items.value[index].isDragging = false;
  window.removeEventListener('mousemove', (e) => handleDragging(e, index));
  window.removeEventListener('mouseup', () => stopDragging(index));
};

const snapToGrid = (value: number, gridSize: number) => {
  return Math.round(value / gridSize) * gridSize;
};

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    items.value.push({
      x: i * 150,
      y: i * 100,
      isDragging: false,
    });
  }
});
</script>
