import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
const API_KEY =`${process.env.REACT_APP_API_KEY}`;
const AUTH_DOMAIN =`${process.env.REACT_APP_AUTH_DOMAIN}`;
const PROJECT_ID =`${process.env.REACT_APP_PROJECT_ID}`;
const STORAGE_BUCKET =`${process.env.REACT_APP_STORAGE_BUCKET}`;
const MESSAGING_SENDER_ID =`${process.env.REACT_APP_MESSAGING_SENDER_ID}`;
const APP_ID =`${process.env.REACT_APP_APPID}`;
const MEASUREMENT_ID =`${process.env.REACT_APP_MEASUREMENT_ID}`;
const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID,
};
export const createUserProfileDocument = async (userAuth,additionalData=null)=>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (e){
            console.log('error creating user', e.message);

        }
    }
    return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    promp:'select_account',
});

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;