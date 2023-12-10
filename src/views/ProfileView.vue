<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/js/firebase';
import { doc, getDoc } from "firebase/firestore";
import {useRouter} from "vue-router";

const currentUser = ref(null);
const userProfile = ref({});
const router = useRouter();

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    currentUser.value = user;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        userProfile.value = userDocSnap.data();
        if (userProfile.value.new) {
          await router.push('/profile/edit');
        }
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }
  else {
    console.log('No user is logged in');
  }
});

const editProfile = () => {
  router.push('/profile/edit');
};

</script>

<template>
  <div class="usersettings">
    <h1>User Settings</h1>
    <div v-if="currentUser">
      <p>Current user: {{ currentUser.email }}</p>
      <p>Location: {{ userProfile.location }}</p>
      <p>Gender: {{ userProfile.gender }}</p>
      <p>Age: {{ userProfile.age }}</p>
      <p>Days per week: {{ userProfile.daysPerWeek }}</p>
      <p>Workout duration: {{ userProfile.workoutDuration }}</p>
      <p>Bench weight: {{ userProfile.benchWeight }}kg</p>
      <p>Deadlift weight: {{ userProfile.deadliftWeight }}kg</p>
      <p>Squat weight: {{ userProfile.squatWeight }}kg</p>
      <p>Goals: {{ userProfile.goals }}</p>
      <button @click="editProfile">Edit Profile</button>

    </div>
  </div>
</template>

