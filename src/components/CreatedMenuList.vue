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
              <q-btn flat round color="primary" icon="edit" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

let menuList = ref<IMenuSettings[]>();

interface IMenuResponse {
  menus: IMenuSettings[];
}

interface IMenuSettings {
  id: number;
  name: string;
  description?: string;
}

async function getMenuList(): Promise<IMenuSettings[]> {
  try {
    const response: IMenuResponse = await import('../stores/menuRecords.json');
    return response.menus;
  } catch (error) {
    console.error('Error fetching menu list:', error);
    return [];
  }
}

onBeforeMount(async () => {
  menuList.value = await getMenuList();
});
</script>
