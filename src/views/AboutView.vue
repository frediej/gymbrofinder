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

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.about-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.user-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
}

/* Additional styling for UserCard component (adjust as needed) */
.user-card {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>