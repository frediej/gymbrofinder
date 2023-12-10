<script setup>
import {ref} from 'vue'
import { auth } from '@/js/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {useRouter} from "vue-router";

const email = ref(null)
const password = ref(null)
const router = useRouter();

function login () {
  console.log("Login : " + email.value + " : " + password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        console.log(userCredential)
        router.push('/')
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
  <div class="login-container">
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
</div>
</template>


<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(180deg, #1D1B1C 0%, #000000 100%);
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;
  padding: 100px;
}

.register,
.login {
  max-width: 400px;
  height: 400px;
  margin: 2rem auto;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register {
  background: linear-gradient(135deg, #c8b844, #cf4343);
  color: #fff;
}

.login {
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
