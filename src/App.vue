<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initializeApp } from 'firebase/app';
import { firebaseKey } from './authorization/firebaseKey';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseKey);

const db = getFirestore(firebaseApp);

const $q = useQuasar();

$q.dark.set('auto');
</script>
