import { initializeApp } from 'firebase'

var app = initializeApp({
    apiKey: "AIzaSyB4OhDAClL7zuJXqRBqKEuw76xj1JVBan0",
    authDomain: "nu-ker-fox.firebaseapp.com",
    databaseURL: "https://nu-ker-fox.firebaseio.com",
    projectId: "nu-ker-fox",
    storageBucket: "nu-ker-fox.appspot.com",
    messagingSenderId: "174374570388"
})

export const db = app.database()