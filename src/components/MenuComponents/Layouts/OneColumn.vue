<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <div v-html="selectedMenuSections"></div>
        <div @dragover.prevent @drop="openMenuItemsModal" style="height: 200px; border: 1px solid #2ecc71"></div>

        <!-- <template>
          <component :is="ChildComponent" />
        </template> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  selectedMenuSections: {
    type: String,
    required: false,
  },
  component: Object,
  draggedElementId: String,
});

const emits = defineEmits<{
  openMenuItemsModal: [string];
}>();

const openMenuItemsModal = (): void => {
  return emits('openMenuItemsModal', props.draggedElementId);
};
</script>
