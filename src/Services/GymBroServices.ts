import {db} from '@/js/firebase';
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

const userColRef = collection(db, "users");

const GymBroServices = {
    async getAllUsers() {
        const snapshot = await getDocs(userColRef);
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    },
    async addMatch(currentUserId: string, matchedUserId: string) {
        try {
            const matchRef = doc(db, "users", currentUserId, "matches", matchedUserId);
            await setDoc(matchRef, {matched: true});
        } catch (error) {
            console.error("Error adding match:", error);
            throw error; // Throw error to handle it in the calling function
        }
    },
    async addReject(currentUserId: string, rejectedUserId: string) {
        try {
            const rejectRef = doc(db, "users", currentUserId, "rejects", rejectedUserId);
            await setDoc(rejectRef, {rejected: true});
        } catch (error) {
            console.error("Error adding reject:", error);
            throw error; // Throw error to handle it in the calling function
        }
    },
    async getExcludedUsers(currentUserId: string) {
        try {
            const matchesSnapshot = await getDocs(collection(db, "users", currentUserId, "matches"));
            const rejectsSnapshot = await getDocs(collection(db, "users", currentUserId, "rejects"));
            const [matches, rejects] = await Promise.all([getDocs(matchesSnapshot.query), getDocs(rejectsSnapshot.query)]);
            return new Set(matches.docs.map(doc => doc.id).concat(rejects.docs.map(doc => doc.id)));
        } catch (error) {
            console.error("Error getting excluded users:", error);
            throw error; // Throw error to handle it in the calling function
        }
    },
    async getMatchedUsers(currentUserId: string) {
        try {
            const matchesRef = collection(db, "users", currentUserId, "matches");
            const matchesSnapshot = await getDocs(matchesRef);
            const matchIds = matchesSnapshot.docs.map(doc => doc.id);

            const userDocs = await Promise.all(matchIds.map(userId => getDoc(doc(db, "users", userId))));
            return userDocs.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error getting matched users:", error);
            throw error;
        }
    },
};

export default GymBroServices;
