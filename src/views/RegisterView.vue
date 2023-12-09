<script setup lang="ts">
import {reactive } from 'vue'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {db} from '@/js/firebase'
import { doc, setDoc, collection } from "firebase/firestore";
import {useRouter} from "vue-router";

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
  errorMessage: '',
  isLoading: false
})

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(): boolean {
  if (!validateEmail(formData.email)) {
    formData.errorMessage = 'Please enter a valid email address.';
    return false;
  }

  if (formData.password.length < 6) {
    formData.errorMessage = 'Password must be at least 6 characters long.';
    return false;
  }

  formData.errorMessage = '';
  return true;
}

async function submitForm() {
  if (!validateForm()) return;

  formData.isLoading = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      email: formData.email,
      new: true,
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

    const matchesRef = doc(collection(userRef, 'matches'), 'placeholder');
    await setDoc(matchesRef, { initialized: true });
    const rejectsRef = doc(collection(userRef, 'rejects'), 'placeholder');
    await setDoc(rejectsRef, { initialized: true });


    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/profile');
        alert("You have successfully registered! Please fill out your profile to begin matching with others!");
      }
    });

    alert("You have successfully registered! Please fill out your profile to begin matching with others!")
  } catch (error: any) {
    formData.errorMessage = error.message ?? 'An unexpected error occurred.';
  } finally {
    formData.isLoading = false;
  }
}

function resetForm() {
  formData.email = '';
  formData.password = '';
  formData.errorMessage = '';
}
</script>


<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="submitForm">
      <div class="form-item">
        <label for="email">E-mail</label>
        <input v-model="formData.email" id="email" type="email" />
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input v-model="formData.password" id="password" type="password" />
      </div>
      <p v-if="formData.errorMessage" class="error-message">{{ formData.errorMessage }}</p>
      <div class="form-item">
        <button @click.prevent="resetForm">Reset</button>
        <button type="submit" :disabled="formData.isLoading">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-item label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.form-item input {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
}

.form-item input:focus {
  border-color: #007bff;
  outline: none;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
  text-align: center;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  margin-right: 0.5rem;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

button:not([type="submit"]) {
  background-color: #6c757d;
  color: #fff;
}

button:not([type="submit"]):hover {
  background-color: #5a6268;
}
</style>

