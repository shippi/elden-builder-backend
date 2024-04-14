import * as admin from 'firebase-admin';

const serviceAccount = require("./firebase-config.json");

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
catch(error) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export default admin