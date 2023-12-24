<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-mb-md">
          <q-btn @click="toggleRightDrawer" icon="menu" class="q-ma-md" />
          <q-btn @click="decrementColumns" label="Decrease Columns" />
          <q-btn @click="incrementColumns" label="Increase Columns" />
        </div>

        <div class="q-mt-md">
          <div v-for="index in selectedColumns" :key="index" class="q-pa-md">
            Column {{ index }}
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <SingularLeft />
    </q-drawer>
  </q-layout>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';
import SingularLeft from '../components/MenuBlocks/SingularLeft.vue';

const selectedColumns = ref(1);

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const incrementColumns = () => {
  if (selectedColumns.value >= 12) {
    return;
  }
  selectedColumns.value += 1;
};

const decrementColumns = () => {
  if (selectedColumns.value <= 1) {
    return;
  }
  selectedColumns.value -= 1;
};
</script>
