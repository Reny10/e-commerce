import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
apiKey: "AIzaSyDR8eWLwkXI8enlE0NcYsV72UiBhnR05oE",
authDomain: "e-commerce-89710.firebaseapp.com",
databaseURL: "https://e-commerce-89710.firebaseio.com",
projectId: "e-commerce-89710",
storageBucket: "e-commerce-89710.appspot.com",
messagingSenderId: "585846998468",
appId: "1:585846998468:web:9f4e3f5b0134ee7b8c1091",
//measurementId: "G-VWJC7XC3SW"
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