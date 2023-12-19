<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div
        v-for="menu in menuList"
        :key="menu.id"
        class="col-md-4 col-sm-12 col-xs-12"
      >
        <q-card class="menu__card" flat bordered>
          <q-card-section horizontal>
            <q-img class="col" src="https://cdn.quasar.dev/img/mountains.jpg">
              <div class="absolute-bottom">
                <div class="text-h6">
                  {{ menu.name }}
                </div>
                <div class="text-caption">
                  {{ menu.description }}
                </div>
              </div>
            </q-img>

            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                @click="editMenuSettings(menu)"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="selectMenuDialog">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Edit Menu</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form v-if="menuSettings" class="q-gutter-md">
              <q-input
                filled
                v-model="menuSettings.name"
                label="Menu Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="menuSettings.description"
                label="Menu Description"
              />
            </q-form>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { IMenuResponse, IMenuSettings } from '../interfaces'

const emit = defineEmits(['fetchedMenuList']);
const menuList = ref<IMenuSettings[]>();
const selectMenuDialog = ref(false);
const menuSettings = ref<IMenuSettings>();

async function getMenuList(): Promise<IMenuSettings[]> {
  try {
    const response: IMenuResponse = await import('../stores/menuRecords.json');

    return response.menus;
  } catch (error) {
    console.error('Error fetching menu list:', error);
    return [];
  }
}

const editMenuSettings = (editSelectedMenu: IMenuSettings) => {
  selectMenuDialog.value = true;
  menuSettings.value = editSelectedMenu;
};

onBeforeMount(async () => {
  menuList.value = await getMenuList();
  emit('fetchedMenuList', menuList.value);
});
</script>
