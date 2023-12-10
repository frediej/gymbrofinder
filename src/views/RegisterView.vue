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
      goals: '',
      lineID: ''
    });

    const matchesRef = doc(collection(userRef, 'matches'), 'placeholder');
    await setDoc(matchesRef, { initialized: true });
    const rejectsRef = doc(collection(userRef, 'rejects'), 'placeholder');
    await setDoc(rejectsRef, { initialized: true });


    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/profile');
      }
    });

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
  <div class="profile-container">
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="submitForm">
      <div class="form-item">
        <label for="email">E-mail</label>
        <input v-model="formData.email" id="email" type="email" />
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input v-model="formData.password" id="password" type="password" @keyup.enter="submitForm" />
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
</div>
</template>

<style scoped>

.profile-container {
  height: 100vh;
  background: linear-gradient(180deg, #1D1B1C 0%, #000000 100%);
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;
  padding: 100px;
}

.register {
  max-width: 400px;
  height: 400px;
  margin: 2rem auto;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #c8b844, #cf4343);
  color: #fff;
}

h1 {
  text-align: center;
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
}

.form-item input {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
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
  max-width: 200px;
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
  max-width: 200px;
}

button:not([type="submit"]):hover {
  background-color: #5a6268;
}
</style>


