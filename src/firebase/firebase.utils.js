import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD-3YZ-oQoIYlVwl1-qtGbnttdxUek6-F4",
    authDomain: "crown-db-d5d76.firebaseapp.com",
    databaseURL: "https://crown-db-d5d76.firebaseio.com",
    projectId: "crown-db-d5d76",
    storageBucket: "crown-db-d5d76.appspot.com",
    messagingSenderId: "968540120907",
    appId: "1:968540120907:web:dd2f22206b81c189332ace",
    measurementId: "G-13C9X5R4VT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('Error creating user', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
