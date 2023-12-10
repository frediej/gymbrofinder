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
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 mb-4 mx-2">
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
    </div>
</template>

<style scoped>
.max-w-sm {
  width: 100%;
  max-width: 20rem;
}

.rounded {
  border-radius: 8px;
}

.overflow-hidden {
  overflow: hidden;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: #ffffff;
}

.p-4 {
  padding: 1rem;
}

.text-xl {
  font-size: 1.25rem;
  align-items: center;
}

.font-semibold {
  font-weight: 600;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-gray-700 {
  color: #000000;
}

.text-base {
  font-size: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

</style>
