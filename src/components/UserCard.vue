<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    connectUser() {
      this.$emit('connect');
    },
    rejectUser() {
      this.$emit('reject');
    }
  }
}
</script>

<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
    <h3 class="text-xl font-semibold mb-2">Name: {{ user.name }}</h3>
    <ul class="text-gray-700 text-base mb-4">
      <li><strong>Location:</strong> {{user.location}}</li>
      <li><strong>Gender:</strong> {{ user.gender }}</li>
      <li><strong>Age:</strong> {{ user.age }}</li>
      <li><strong>Workouts/Week:</strong> {{ user.daysPerWeek }}</li>
      <li><strong>Bench Weight:</strong> {{ user.benchWeight }}</li>
      <li><strong>Deadlift Weight:</strong> {{ user.deadliftWeight }}</li>
      <li><strong>Squat Weight:</strong> {{ user.squatWeight }}</li>
      <li><strong>Workout Duration:</strong> {{ user.workoutDuration }}</li>
      <li><strong>Goals:</strong> {{ user.goals }}</li>
      <li><strong>Line ID:</strong> {{ user.lineID }}</li>
    </ul>
    <div class="flex justify-between">
      <button @click="connectUser" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Connect
      </button>
      <button @click="rejectUser" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Reject
      </button>
    </div>
  </div>
</template>

