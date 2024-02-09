<template>
  <q-dialog v-model="isOpen" @hide="closeBasicMenuItemModal">
    <q-card style="width: 700px; max-width: 80vw">
      <div class="menu__form">
        <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
          <div class="q-pa-md">
            <q-input
              filled
              v-model="menuItem.title"
              label="Menu Item Name"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              filled
              v-model="menuItem.price"
              label="Menu Price"
              dense
              :rules="[(val) => !!val || 'Field is required']"
            />

            <q-space class="q-pa-md" />

            <q-btn label="Reset Menu Item" type="button" color="primary" @click="onReset" flat></q-btn>
            <q-btn label="Add Menu Item" type="submit" color="primary" class="float-right"></q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts"></script>
