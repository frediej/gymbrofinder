import { db } from '@/js/firebase';
import { collection, setDoc, doc, getDocs } from "firebase/firestore";

const userColRef = collection(db, "users");

const GymBroServices = {
    async getAllUsers() {
        const snapshot = await getDocs(userColRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async addMatch(currentUserId: string, matchedUserId: string) {
        try {
            const matchRef = doc(db, "users", currentUserId, "matches", matchedUserId);
            await setDoc(matchRef, { matched: true });
        } catch (error) {
            console.error("Error adding match:", error);
            throw error; // Throw error to handle it in the calling function
        }
    }
};

export default GymBroServices;
