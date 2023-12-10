import {defineStore} from 'pinia'
import GymBroServices from "@/Services/GymBroServices";

type User = {
    id: string;
    name: string;
    location: string;
    gender: string;
    age: string;
    daysPerWeek: string;
    workoutDuration: string;
    benchWeight: string;
    deadliftWeight: string;
    squatWeight: string;
    goals: string;
}
export const useStore = defineStore('gymbros', {
    state: () => ({
        allUsers: [] as User[],
    }),
    actions: {
        async fetchAllUsers() {
            try {
                this.allUsers = (await GymBroServices.getAllUsers()) as User[];
            } catch (error) {
                console.log(error);
            }
        }
    }
})
