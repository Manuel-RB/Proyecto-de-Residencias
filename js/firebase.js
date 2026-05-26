var firebaseConfig = {
    apiKey: "AIzaSyAJxonB8woJx5wMU7qn9V6mp5LU_oPIRM4",
    authDomain: "autenticacion-9ff38.firebaseapp.com",
    databaseURL: "https://autenticacion-9ff38.firebaseio.com",
    projectId: "autenticacion-9ff38",
    storageBucket: "autenticacion-9ff38.appspot.com"
};
firebase.initializeApp(firebaseConfig);
// Hacer referencias auth y firestore 
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// update configuracion firestore
db.settings({ timestampsInSnapshots: true });

