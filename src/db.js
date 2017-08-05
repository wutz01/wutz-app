import Firebase from 'firebase'
let config = {
 apiKey: "AIzaSyA_ZzunWjPVMqXsY6DlTP3cGjRjziDnnks",
 authDomain: "chat-room-970c7.firebaseapp.com",
 databaseURL: "https://chat-room-970c7.firebaseio.com",
 projectId: "chat-room-970c7",
 storageBucket: "chat-room-970c7.appspot.com",
 messagingSenderId: "1080133854031"
};
  
let app = Firebase.initializeApp(config)
let db = app.database()

export default db