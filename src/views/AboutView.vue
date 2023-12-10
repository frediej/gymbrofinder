<template>
  <div class="about">
    <h1>Find Your Gym Bro</h1>
    <div v-if="allUsers.length">
      <UserCard v-for="user in allUsers" :key="user.id" :user="user" />
    </div>
    <div v-else>
      <p>Loading users...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "@/stores/store"; // Adjust the path based on your project structure
import UserCard from "@/components/UserCard.vue"; // Ensure correct path

const store = useStore();

onMounted(() => {
  if (store.allUsers.length === 0) {
    store.fetchAllUsers();
  }
});

const allUsers = computed(() => store.allUsers);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
