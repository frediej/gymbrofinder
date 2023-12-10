<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
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
  </div>
</template>

