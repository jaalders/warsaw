<template>
  <q-layout view="lHh lpr lfr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://placehold.co/50x50" />
          </q-avatar>
          Smorgasbord
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          v-model="link"
          :active="link === '/'"
          to="/"
          @click="link = '/'"
        >
          <q-item-section avatar>
            <i
              aria-hidden="true"
              role="presentation"
              class="material-icons q-icon notranslate"
              >dashboard</i
            >
          </q-item-section>

          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          v-model="link"
          :active="link === 'create-menu'"
          to="/create-menu"
          @click="link = 'create-menu'"
        >
          <q-item-section avatar>
            <i
              aria-hidden="true"
              role="presentation"
              class="material-icons q-icon notranslate"
              >restaurant_menu</i
            >
          </q-item-section>

          <q-item-section>Create Menu</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-model="link"
          :active="link === 'manage-menus'"
          to="/manage-menus"
          @click="link = 'manage-menus'"
        >
          <q-item-section avatar>
            <i
              aria-hidden="true"
              role="presentation"
              class="material-icons q-icon notranslate"
              >menu_book</i
            >
          </q-item-section>

          <q-item-section>Manage Menus</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-model="link"
          :active="link === 'configure-displays'"
          to="/configure-displays"
          @click="link = 'configure-displays'"
        >
          <q-item-section avatar>
            <i
              aria-hidden="true"
              role="presentation"
              class="material-icons q-icon notranslate"
              >tv</i
            >
          </q-item-section>

          <q-item-section>Configure Displays</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-model="link"
          :active="link === 'menu-analytics'"
          to="/menu-analytics"
          @click="link = 'menu-analytics'"
        >
          <q-item-section avatar>
            <i
              aria-hidden="true"
              role="presentation"
              class="material-icons q-icon notranslate"
              >query_stats</i
            >
          </q-item-section>

          <q-item-section>Menu Analytics</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseKey } from '../authorization/firebaseKey';

interface IFirebaseResponseStructure {
  id: number;
  name: string;
  description?: string;
}

const leftDrawerOpen = ref(false);
const link = ref('/');
const firebaseApp = initializeApp(firebaseKey);
const db = getFirestore(firebaseApp);
const todos = ref<IFirebaseResponseStructure[]>();

async function fetchTodos(): Promise<IFirebaseResponseStructure[]> {
  try {
    // MULTIPLE EXAMPLE
    // const todosSnapshot = await getDocs(collection(db, 'todos'));

    // const todoData = todosSnapshot.docs.map((doc) => {
    //   return doc.data() as IFirebaseResponseStructure;
    // });

    // return todoData;

    const todoId = 'HBC5lqP1jUUQpD8F5XkQ';
    const todoDocRef = doc(db, 'todos', todoId);
    const todoSnapshot = await getDoc(todoDocRef);

    const todoData = todoSnapshot.exists()
      ? [todoSnapshot.data() as IFirebaseResponseStructure]
      : [];

    return todoData;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

onBeforeMount(async () => {
  try {
    todos.value = await fetchTodos();
  } catch (error) {
    console.log('Error fetching menu list:', error);
  }
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
