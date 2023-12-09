<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from 'vue';
import { auth } from "@/js/firebase";
import type { User } from "firebase/auth"; // Import the User type definition

const user = ref<User | null>(null); // Define user as a ref that can hold a User object or null

onMounted(() => {
  auth.onAuthStateChanged((u) => {
    user.value = u; // Correctly assign the user object or null to user.value
  });
});

const logout = () => {
  auth.signOut();
};
</script>


<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/search" v-if="user">Search</RouterLink>
          <RouterLink to="/matches" v-if="user">Matches</RouterLink>
          <RouterLink to="/profile" v-if="user">Profile</RouterLink>
          <RouterLink to="/login" v-if="!user">Login</RouterLink>
          <button v-if="user" @click="logout">Logout</button>
          <RouterLink to="/register" v-if="!user">Register</RouterLink>
        </nav>
      </div>
    </header>
  </div>

  <RouterView />
</template>


<style scoped>
#layout {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smooting: antialiased;
  -moz-osx-font-smooting: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: center;
  background-color: gray;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px 15px;
  transition: background-color 0.2s ease;
}

nav a:hover {
  background-color: #2c3e50;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: #d0f0d0;
}
</style>


