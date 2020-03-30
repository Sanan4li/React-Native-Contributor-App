import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyArjvbErDpk1TRjit1DRxxFEzYpeEIxghg",
    authDomain: "react-native-contributer.firebaseapp.com",
    databaseURL: "https://react-native-contributer.firebaseio.com",
    projectId: "react-native-contributer",
    storageBucket: "react-native-contributer.appspot.com",
    messagingSenderId: "133344870283",
    appId: "1:133344870283:web:f748fdc773c9e29ad4b98e",
    measurementId: "G-C0V5NW3LS8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;