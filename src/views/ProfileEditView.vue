<script setup>
import { ref, reactive, onMounted } from 'vue';
import { auth, db } from '@/js/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const currentUser = ref(null);
const userProfile = reactive({
  location: '',
  gender: '',
  age: '',
  daysPerWeek: '',
  benchWeight: '',
  deadliftWeight: '',
  squatWeight: '',
  workoutDuration: '',
  goals: ''
});
const router = useRouter();

const locations = ['Salaya', 'Nonthaburi', 'Sukhumvit', 'Asok', 'Thong Lo'];
const genders = ['Male', 'Female', 'Other'];
const ages = Array.from({ length: 87 }, (_, i) => i + 13);
const daysPerWeek = Array.from({ length: 7 }, (_, i) => i + 1);
const workoutDurations = ['0-1 hour', '1-2 hours', '2-3 hours', '3+ hours'];
const goalsOptions = ['Lose Weight', 'Gain Muscle', 'Gain Strength'];


onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    currentUser.value = user;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        Object.assign(userProfile, userDocSnap.data());
        if (userProfile.new) {
          await updateDoc(userDocRef, { new: false });
        }
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }
});

const saveProfile = async () => {
  if (!currentUser.value) return;

  const userDocRef = doc(db, 'users', currentUser.value.uid);
  try {
    await updateDoc(userDocRef, userProfile);
    await updateDoc(userDocRef, { ...userProfile, new: false });
    router.push('/profile');
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
</script>

<template>
  <div class="profile-edit">
    <h1>Edit Profile</h1>
    <form @submit.prevent="saveProfile">
      <div class="form-item">
        <label for="name">Name:</label>
        <input v-model="userProfile.name" id="name" type="text"/>
      </div>
      <div class="form-item">
        <label for="location">Location:</label>
        <select v-model="userProfile.location" id="location">
          <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="gender">Gender:</label>
        <select v-model="userProfile.gender" id="gender">
          <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="age">Age:</label>
        <select v-model="userProfile.age" id="age">
          <option v-for="age in ages" :key="age" :value="age">{{ age }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="daysPerWeek">Days per week:</label>
        <select v-model="userProfile.daysPerWeek" id="daysPerWeek">
          <option v-for="days in daysPerWeek" :key="days" :value="days">{{ days }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="workoutDuration">Workout duration:</label>
        <select v-model="userProfile.workoutDuration" id="workoutDuration">
          <option v-for="duration in workoutDurations" :key="duration" :value="duration">{{ duration }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="benchWeight">Bench weight:</label>
        <input v-model="userProfile.benchWeight" id="benchWeight" type="number" />
      </div>
      <div class="form-item">
        <label for="deadliftWeight">Deadlift weight:</label>
        <input v-model="userProfile.deadliftWeight" id="deadliftWeight" type="number" />
      </div>
      <div class="form-item">
        <label for="squatWeight">Squat weight:</label>
        <input v-model="userProfile.squatWeight" id="squatWeight" type="number" />
      </div>
      <div class="form-item">
        <label for="goals">Goals:</label>
        <select v-model="userProfile.goals" id="goals" multiple>
          <option v-for="goal in goalsOptions" :key="goal" :value="goal">{{ goal }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="lineID">Line ID:</label>
        <input v-model="userProfile.lineID" id="lineID" type="text" />
      </div>
      <button type="submit" @click="saveProfile">Save Profile</button>
    </form>
  </div>
</template>

<style>

.form-item {
  margin-bottom: 1rem;
}

.form-item label {
  margin-bottom: 0.5rem;
}

.form-item input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
