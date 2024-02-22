<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <p>One Column HTML</p>
        <div v-html="selectedMenuSections"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  selectedMenuSections: {
    type: String,
    required: false,
  },
});
</script>
