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
          <button v-if="user" @click="logout" class="nav-link">Logout</button>
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
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

nav a,
nav button {
  font-weight: bold;
  color: #cadff5;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px 15px;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
  white-space: nowrap; /* so it's all in one line*/
}

nav a:after,
nav button:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: rgb(206, 219, 93);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

nav a:hover {
  color: rgb(206, 219, 93);
}

nav button:hover {
  color: rgb(219, 128, 93);
}

nav a:hover:after,
nav button:hover:after {
  transform: scaleX(1);
  transform-origin: left;
}

nav a.router-link-exact-active {
  color: rgb(206, 219, 93);
  background-color: transparent;
}


</style>