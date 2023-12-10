<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/js/firebase';
import { doc, getDoc } from "firebase/firestore";
import {useRouter} from "vue-router";
import ProfileCard from "@/components/ProfileCard.vue";
const currentUser = ref(null);
const userProfile = ref({});
const router = useRouter();

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    currentUser.value = user;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        userProfile.value = userDocSnap.data();
        if (userProfile.value.new && router.currentRoute.value.path !== '/profile/edit') {
          await router.push('/profile/edit');
        }
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }
  else {
    console.log('No user is logged in');
  }
});

const editProfile = () => {
  router.push('/profile/edit');
};

</script>

<template>
  <div class="profile-container">
    <div v-if="currentUser">
      <ProfileCard :user="userProfile" />
      <button @click="editProfile" class="edit-button">Edit Profile</button>
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

.edit-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fff;
  color: #1D1B1C;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: rgb(206, 219, 93);
}
</style>