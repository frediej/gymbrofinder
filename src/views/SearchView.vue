<template>
    <div class="search-container">
      <h1>Search for Gym Buddies</h1>
  
      <div class="search-filters">
        <label for="age">Age:</label>
        <input v-model="filters.age" type="number">
  
        <!-- Add other filters here-->
  
        <button @click="searchUsers">Search</button>
      </div>
  
      <!-- Displaying the results -->
      <div v-if="searchResults.length > 0" class="search-results">
        <h2>Search Results:</h2>
        <ul>
          <li v-for="user in searchResults" :key="user.id">
            {{ user.email }} - Age: {{ user.age }}, Bench Weight: {{ user.benchWeight }}
            <!-- Display other user information-->
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No results found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db } from '@/js/firebase'; // Adjust the path based on your Firebase setup
  
  const filters = ref({
    age: null,
    // Add other filter fields as needed
  });
  
  const searchResults = ref([]);
  
  const searchUsers = async () => {
    try {
      // Construct a query based on the applied filters
      let query = db.collection('users');
  
      if (filters.value.age !== null) {
        query = query.where('age', '==', filters.value.age);
      }
      const querySnapshot = await query.get();
      searchResults.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error searching users:', error.message);
    }
  };
  </script>
  
  <style scoped>
  </style>
  