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
    <div class="matches">
      <h1>Matches</h1>
      <div v-if="matches.length" class="matches-container">
        <ProfileCard v-for="match in matches" :key="match.id" :user="match" />
      </div>
      <div v-else>
        <p>No gymbros yet!</p>
      </div>
    </div>
  </template>

  <style scoped>
  .matches {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .matches-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  </style>
