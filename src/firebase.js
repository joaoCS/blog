import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyArsQ8SexXnJXPyeAGf1wUF2LkEeAqMJCw",
    authDomain: "reactapp-c2b23.firebaseapp.com",
    databaseURL: "https://reactapp-c2b23.firebaseio.com",
    projectId: "reactapp-c2b23",
    storageBucket: "reactapp-c2b23.appspot.com",
    messagingSenderId: "666998703695",
    appId: "1:666998703695:web:011ea0c11a4fa021"
};

class Firebase {
    constructor () {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        
        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout () {
        return app.auth().signOut();
    }

    async register (nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({nome});
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUsername(callback) {
        if (!app.auth().currentUser) {
            return null;
        }

        const uid  = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }

}

export default new Firebase();