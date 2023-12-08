<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
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
