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
  <div class="usersettings">
    <div v-if="currentUser">
      <profile-card :user="userProfile"></profile-card>
      <button @click="editProfile">Edit Profile</button>

    </div>
  </div>
</template>

