<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <p>One Column HTML</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
  menuSections: {
    type: String,
    required: false,
  },
});
</script>
