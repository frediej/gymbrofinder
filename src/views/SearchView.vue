<script setup>
import {ref, onMounted} from 'vue';
import {useStore} from "@/stores/store";
import UserCard from "@/components/UserCard.vue";
import GymBroServices from "@/Services/GymBroServices";
import {auth} from "@/js/firebase";

const store = useStore();
const filters = ref({
  location: null,
  gender: null,
  age: null,
  daysPerWeek: null,
  workoutDuration: null,
  benchWeight: null,
  deadliftWeight: null,
  squatWeight: null,
  goals: null
});

const currentUserId = auth.currentUser.uid;
const locations = ['Salaya', 'Nonthaburi', 'Sukhumvit', 'Asok', 'Thong Lo'];
const genders = ['Male', 'Female', 'Other'];
const ages = Array.from({ length: 87 }, (_, i) => i + 13);
const daysPerWeek = Array.from({ length: 7 }, (_, i) => i + 1);
const workoutDurations = ['0-1 hour', '1-2 hours', '2-3 hours', '3+ hours'];
const goalsOptions = ['Lose Weight', 'Gain Muscle', 'Gain Strength'];
const showSearchContainer = ref(true);
const searchResults = ref([]);
const excludeIds = ref(new Set());
const ensureUsers = () => {
  if (!store.allUsers.length){
    store.fetchAllUsers();
  }
}

const searchUsers = async () => {
  await fetchExcludedUsers();
  searchResults.value = store.allUsers.filter(user => {
    if (user.id === currentUserId || excludeIds.value.has(user.id)) return false;
    for (const key in filters.value) {
      const filterValue = filters.value[key];
      if (filterValue !== null && filterValue !== '' && user[key] !== filterValue) {
        return false;
      }
    }
    return true;
  });
  showSearchContainer.value = false;
  console.log(searchResults.value);
};

const resetSearch = () => {
  filters.value = {
    location: null,
    gender: null,
    age: null,
    daysPerWeek: null,
    workoutDuration: null,
    benchWeight: null,
    deadliftWeight: null,
    squatWeight: null,
    goals: null
  };
  showSearchContainer.value = true;
  searchResults.value = [];
}
const connectUser = async (matchedUserId) => {
  try {
    await GymBroServices.addMatch(currentUserId, matchedUserId);
    alert("Connection interest saved! If the gymbro also likes you, you may find their full details in the matches tab!");
  } catch (error) {
    console.error('Error connecting users:', error);
    alert("Error connecting users");
  }
}

const rejectUser = async (rejectedUserId) => {
  try {
    await GymBroServices.addReject(currentUserId, rejectedUserId);
    alert("They had small calves anyways, you'll never have to see them again!");
  } catch (error) {
    console.error('Error rejecting user:', error);
    alert("They're kind of big and mogged the system, we couldn't reject them at this time");
  }
}

const fetchExcludedUsers = async () => {
  excludeIds.value = await GymBroServices.getExcludedUsers(currentUserId);
}
onMounted(() => {
  ensureUsers();
});

</script>

<template>
  <div v-if="showSearchContainer" class="search-container">
    <h1>Search for Gym Buddies</h1>

    <div class="search-filters">
      <div class="form-item">
        <label for="location">Location:</label>
        <select v-model="filters.location" id="location">
          <option value="">Any</option>
          <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="gender">Gender:</label>
        <select v-model="filters.gender" id="gender">
          <option value="">Any</option>
          <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="age">Age:</label>
        <select v-model="filters.age" id="age">
          <option value="">Any</option>
          <option v-for="age in ages" :key="age" :value="age">{{ age }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="daysPerWeek">Workouts per Week:</label>
        <select v-model="filters.daysPerWeek" id="daysPerWeek">
          <option value="">Any</option>
          <option v-for="days in daysPerWeek" :key="days" :value="days">{{ days}}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="workoutDuration">Workout Duration:</label>
        <select v-model="filters.workoutDuration" id="workoutDuration">
          <option value="">Any</option>
          <option v-for="duration in workoutDurations" :key="duration" :value="duration">{{ duration }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="benchWeight">Bench Weight:</label>
        <input v-model="filters.benchWeight" id="benchWeight" type="number" placeholder="Any" />
      </div>
      <div class="form-item">
        <label for="deadliftWeight">Deadlift Weight:</label>
        <input v-model="filters.deadliftWeight" id="deadliftWeight" type="number" placeholder="Any" />
      </div>
      <div class="form-item">
        <label for="squatWeight">Squat Weight:</label>
        <input v-model="filters.squatWeight" id="squatWeight" type="number" placeholder="Any" />
      </div>

      <div class="form-item">
        <label for="goals">Goals:</label>
        <select v-model="filters.goals" id="goals" multiple>
          <option value="">Any</option>
          <option v-for="goal in goalsOptions" :key="goal" :value="goal">{{ goal }}</option>
        </select>
      </div>

      <button @click="searchUsers">Search</button>
    </div>
  </div>

  <div v-if="searchResults.length" class="search-results">
    <h2>Search Results:</h2>
    <UserCard v-for="user in searchResults" :key="user.id" :user="user" @connect="connectUser(user.id)" @reject="rejectUser(user.id)"/>
    <button @click="resetSearch" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Search Again
    </button>
  </div>

  <div v-if="!showSearchContainer && !searchResults.length">
    <p>No results found.</p>
    <button @click="resetSearch" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Search Again
    </button>
  </div>
</template>

<style scoped>
/* ... existing styles ... */
.form-item {
  margin-bottom: 1rem;
}

.form-item label {
  margin-bottom: 0.5rem;
}

.form-item select, .form-item input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

