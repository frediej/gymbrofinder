<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/js/firebase';

const currentUser = ref(null);

onMounted(() => {
  currentUser.value = auth.currentUser;
  if (currentUser.value != null) {
    console.log("Current user is: " + currentUser.value.email);
    console.log(auth.currentUser);
  }
});
</script>

<template>
  <div class="usersettings">
    <h1>User Settings</h1>
    <div v-if="currentUser !== null">
      <p>Current user: {{ currentUser.email }}</p>
    </div>

  </div>
</template>
