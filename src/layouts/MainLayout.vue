<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="flex items-center justify-between">
        <q-toolbar-title>
          <!-- Add any title or leave it empty if no title is needed -->
        </q-toolbar-title>
        <q-space /> <!-- This will push the button to the right -->
        <q-btn @click="showInviteDialog = true" unelevated rounded color="primary" icon-right="mail" label="Invite" class="mr-4" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showInviteDialog" persistent>
      <InviteCard @close-dialog="showInviteDialog = false" />
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InviteCard from 'pages/InviteCard.vue';

const showInviteDialog = ref(false);
</script>

<style scoped>
/* Add any custom styles here */
</style>
