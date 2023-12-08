<script setup>

import {ref} from 'vue'
import { auth } from '@/js/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)

function login () {
  console.log("Login : " + email.value + " : " + password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        console.log(userCredential)
        router.push('/books')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code: " + errorCode)
        console.log("Error Message: " + errorMessage)
      });

}
function resetForm () {
  console.log("Reset Form");
  email.value = null;
  password.value = null;
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-item">
        <label>e-mail </label>
        <input v-model="email" id="email" type="text" />
      </div>
      <div class="form-item">
        <label>password </label>
        <input v-model="password" id="password" type="password" />
      </div>
      <div class="form-item">
        <button @click.prevent="resetForm">Reset </button>
        <button type="submit">Login </button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.form-item {
  margin-bottom: 1rem;
}
</style>
