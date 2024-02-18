<template>
  <q-dialog v-model="isOpen" @hide="closeMenuSectionOptions">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row">
          <div class="col">
            <p class="text-h6 text-center">Select menu layout</p>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(1)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 100%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(2)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 50%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 50%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(3)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(4)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(5)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 50%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(6)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 50%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 25%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(7)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 66.66%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></div>
            </div>
          </div>
          <div class="col-3">
            <div class="section-layout" @click="addMenuSectionLayout(8)">
              <div class="section-layout-column" style="flex: 0 0 auto; width: 66.66%"></div>
              <div class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.section-layout {
  display: flex;
  height: 70px;
  padding: 10px;
}

.section-layout-column {
  background-color: #d5dadf;
  &:not(:last-child) {
    border-right: 2px solid #1d1d1d;
  }
}

.section-layout:hover .section-layout-column {
  background-color: #6d7882;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  openMenuSectionOptionsModal: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits<{
  closeMenuSectionOptions: [boolean];
  addMenuSectionLayout: [number];
}>();

const isOpen = ref(false);

const closeMenuSectionOptions = (): void => {
  isOpen.value = false;
  return emits('closeMenuSectionOptions', false);
};

watch(
  () => props.openMenuSectionOptionsModal,
  (newValue: boolean): boolean => {
    return (isOpen.value = newValue);
  }
);

const addMenuSectionLayout = (id: number): void => {
  return emits('addMenuSectionLayout', id);
};
</script>
