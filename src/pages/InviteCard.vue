<template>
    <q-card class="invite-card">
      <q-card-section class="row items-center justify-between">
        <div class="w-full">Invite Collaborator</div>
        <q-btn flat round dense icon="close" @click="emit('close-dialog')" />
      </q-card-section>
  
      <q-card-section class="row items-center">
        <q-form @submit="addCollaborator" class="w-full">
          <div class="w-1/2"> <!-- Adjust the width of the input field -->
            <q-input v-model="inviteEmail" label="Email" type="email" />
          </div>
          <div class="w-1/2"> <!-- Adjust the width of the select field -->
            <q-select v-model="accessLevel" :options="accessOptions" label="Access Level" />
          </div>
          <q-btn type="submit" label="Invite" color="primary" class="q-mt-sm" />
        </q-form>
      </q-card-section>
  
      <q-separator class="w-full" /> <!-- Adjust the width of the separator -->
  
      <q-card-section>
        <div v-if="collaborators.length === 0">
          No collaborators added
        </div>
        <div v-else>
          <div v-for="collaborator in collaborators" :key="collaborator.email" class="q-mb-sm">
            <q-item>
              <q-item-section>{{ collaborator.email }}</q-item-section>
              <q-item-section>{{ collaborator.access }}</q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const inviteEmail = ref<string>('');
  const accessLevel = ref<string>('');
  const accessOptions = ref([
    { label: 'Edit', value: 'edit' },
    { label: 'Read', value: 'read' }
  ]);
  
  const collaborators = ref<{ email: string, access: string }[]>([]);
  
  const addCollaborator = () => {
    if (inviteEmail.value && accessLevel.value) {
      collaborators.value.push({
        email: inviteEmail.value,
        access: accessLevel.value
      });
      inviteEmail.value = '';
      accessLevel.value = '';
      emit('close-dialog');
    }
  };
  
  const emit = defineEmits(['close-dialog']);
  </script>
  
  <style scoped>
  .invite-card {
    width: 600px;
    height: 400px;
  }
  </style>
  