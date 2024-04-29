import app from "@/lib/firebase";

export async function handleAuthToken (accessToken: string, uid: string) {
    try {
        const authUser = await app.auth().verifyIdToken(accessToken.split(" ")[1]);
        if (authUser.uid !== uid) return false;
        return true;
    }
    catch (error) {
        return false;
    }
}