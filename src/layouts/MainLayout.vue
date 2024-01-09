<template>
  <q-layout view="lHh lpr lfr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleNavigationMenu" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://placehold.co/50x50" />
          </q-avatar>
          Smorgasbord
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="navigationMenu" side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          :class="{ active: isActive('dashboard') }"
          :to="{ path: 'dashboard' }"
          @click="handleClick('dashboard')"
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
          :class="{ active: isActive('create-menu') }"
          :to="{ path: 'create-menu' }"
          @click="handleClick('create-menu')"
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
          :class="{ active: isActive('manage-menus') }"
          :to="{ path: 'manage-menus' }"
          @click="handleClick('manage-menus')"
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
          :class="{ active: isActive('configure-displays') }"
          :to="{ path: 'configure-displays' }"
          @click="handleClick('configure-displays')"
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
          :class="{ active: isActive('menu-analytics') }"
          :to="{ path: 'menu-analytics' }"
          @click="handleClick('menu-analytics')"
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
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseKey } from '../authorization/firebaseKey';
import { IMenuSettings } from '../interfaces';
import { useRoute } from 'vue-router';

const navigationMenu = ref(false);
const activeLink = ref('');
const route = useRoute();
const isActive = (routePath: string) => route.path === routePath;

const handleClick = (routePath: string) => {
  activeLink.value = routePath;
};

const firebaseApp = initializeApp(firebaseKey);
const db = getFirestore(firebaseApp);
const todos = ref<IMenuSettings[]>();

async function fetchTodos(): Promise<IMenuSettings[] | void> {
  try {
    // MULTIPLE EXAMPLE
    // const todosSnapshot = await getDocs(collection(db, 'todos'));

    // const todoData = todosSnapshot.docs.map((doc) => {
    //   return doc.data() as IFirebaseResponseStructure;
    // });

    // return todoData;

    const todoSnapshot = await getDoc(doc(db, 'todos', 'HBC5lqP1jUUQpD8F5XkQ'));

    todos.value = todoSnapshot.exists()
      ? [todoSnapshot.data() as IMenuSettings]
      : [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

onBeforeMount(async () => {
  await fetchTodos();
  // TODO - Convert to class structure with function call.
});

onMounted(() => {
  const storedActiveLink = sessionStorage.getItem('activeLink');
  if (storedActiveLink) {
    activeLink.value = storedActiveLink;
  }
});

watch(
  () => route.path,
  (newPath: string) => {
    activeLink.value = newPath;
    sessionStorage.setItem('activeLink', newPath);
  }
);

const toggleNavigationMenu = () => {
  navigationMenu.value = !navigationMenu.value;
};
</script>
