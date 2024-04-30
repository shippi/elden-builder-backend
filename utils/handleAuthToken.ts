import app from "@/lib/firebase";

export async function handleAuthToken (accessToken: string, uid?: string) {
    try {
        const authUser = await app.auth().verifyIdToken(accessToken.split(" ")[1]);
        if (uid && authUser.uid !== uid) return false;
        if (authUser) return authUser.uid

        return true;
    }
    catch (error) {
        return false;
    }
}