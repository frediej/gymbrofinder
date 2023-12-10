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
  height: calc(100vh); /* Adjust the value based on your nav bar height */
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
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.action-button:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(206, 219, 93, 0.277));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease-in-out;
  pointer-events: none;
  z-index: 2;
}

.action-button:hover:before {
  transform: scaleX(1);
  transform-origin: left;
  z-index: 2;
}

.action-button span {
  position: relative;
  z-index: 2;
}
</style>
