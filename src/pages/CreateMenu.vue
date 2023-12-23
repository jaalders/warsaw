<template>
  <q-page>
    <div class="q-mb-md">
      <q-btn @click="decrementColumns" label="Decrease Columns" />
      <q-btn @click="incrementColumns" label="Increase Columns" />
    </div>

    <div class="q-mt-md">
      <div v-for="index in selectedColumns" :key="index" class="q-pa-md">
        Column {{ index }}
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';

const selectedColumns = ref(1);

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
