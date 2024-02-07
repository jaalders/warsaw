<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn no-caps class="button" style="margin: 2px" @click="today"> Today </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="prev"> &lt; Prev </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="next"> Next &gt; </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['today', 'prev', 'next']);

const today = () => {
  emit('today');
};
const prev = () => {
  emit('prev');
};

const next = () => {
  emit('next');
};
</script>
