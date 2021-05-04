import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBCO13yGkyPjj2JD0D8IuL6ACfj6J6cdoc",
  authDomain: "ecommerce-db-44a74.firebaseapp.com",
  projectId: "ecommerce-db-44a74",
  storageBucket: "ecommerce-db-44a74.appspot.com",
  messagingSenderId: "354660551857",
  appId: "1:354660551857:web:b2eefae8955f279043a690",
  measurementId: "G-ZDWJV2JSZT"
};

firebase.initializeApp(config);

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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
