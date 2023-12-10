import {db} from '@/js/firebase'
import { getDocs, collection } from "firebase/firestore";

const userColRef = collection(db, "users");

export default {
    async getAllUsers() {
        const snapshot = await getDocs(userColRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

}
