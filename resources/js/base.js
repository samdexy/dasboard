import Firebase from "firebase";

// firebase init goes here
let config = {
  apiKey: "AIzaSyAwF2tcxr4mL-GmEoEj5hJ9SNHBiEV0Lvs",
  authDomain: "wiezijnweekishet.firebaseapp.com",
  databaseURL: "https://wiezijnweekishet.firebaseio.com",
  projectId: "wiezijnweekishet",
  storageBucket: "wiezijnweekishet.appspot.com",
  messagingSenderId: "617443469600"
};


let app = Firebase.initializeApp(config);
let db = app.database();
let ref = db.ref("users");


ref.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key);
});