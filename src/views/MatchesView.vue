<script setup>
import {ref, onMounted} from "vue";
import ProfileCard from "@/components/ProfileCard.vue";
import GymBroServices from "@/Services/GymBroServices";
import {auth} from "@/js/firebase";

const matches = ref([]);

onMounted(async () => {
  matches.value = await GymBroServices.getMatchedUsers(auth.currentUser.uid);
  console.log(matches.value);
});
</script>

<template>
  <div class="matches-container">
    <div class="matches">
      <h1 class="text-3xl font-bold mb-4">Matches</h1>
      <div v-if="matches.length" class="flex flex-wrap -mx--100">
        <ProfileCard v-for="match in matches" :key="match.id" :user="match" />
      </div>
      <div v-else>
        <p class="text-xl">No gymbros yet!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.matches-container {
  max-width: 100000px;
  max-height: 100000vh;
  padding: 11vh;
  background: #1D1B1C;
  color: white;
}

.matches {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.matches h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: rgb(255, 255, 255);
}

.matches-container .flex {
  display: flex;
  flex-wrap: wrap;
}

.matches-container .flex .ProfileCard {
  flex: 0 0 48%;
  margin-bottom: 1rem;
  margin: 0.2rem;
}

.text-xl {
  font-size: 1.5rem;
}

</style>
