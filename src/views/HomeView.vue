<template>
  <div class="home-container">
    <img src="@/assets/homebackgground.jpg" alt="Gym People Image" class="background-image">

    <div class="content-overlay">
      <h1 class="welcome-text">Welcome to GymBroFinder!</h1>
      <p class="description-text">Connect with workout buddies and achieve your fitness goals together.</p>

      <router-link :to="user === null ? '/login' : '/search'">
        <button class="action-button">Find a gym buddy now</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// setup
</script>

<style scoped>
.home-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}

.welcome-text {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.description-text {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.action-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  margin: 0 10px;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #fff;
  color: #000;
}
</style>
