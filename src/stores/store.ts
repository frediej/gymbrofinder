import {defineStore} from 'pinia'
import GymBroServices from "@/Services/GymBroServices";

export const useStore = defineStore('gymbros', {
    state: () => ({
        allUsers: [],
    }),
    actions: {
        async fetchAllUsers() {
            try {
                this.allUsers = await GymBroServices.getAllUsers();
            } catch (error) {
                console.log(error);
            }
        }
    }
})
