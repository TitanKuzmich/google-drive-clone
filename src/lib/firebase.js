import firebase from 'firebase/compat'

const firebaseConfig = {
    apiKey: "AIzaSyDhDAiFqmjC1KCIWnLwM3hygK6Uvmy1EYU",
    authDomain: "drive-clone-ef41c.firebaseapp.com",
    projectId: "drive-clone-ef41c",
    storageBucket: "drive-clone-ef41c.appspot.com",
    messagingSenderId: "641557505589",
    appId: "1:641557505589:web:08845fe12a78806367737c"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const db = {
    files: firestore.collection('files'),
    folders: firestore.collection('folders'),
    formatDoc: doc => {
        return {id: doc.id, ...doc.data()}
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp()
}
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, db, storage, provider}