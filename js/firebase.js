var firebaseConfig = {
    apiKey: "AIzaSyCdJ0Xqz9iAfx2sFkYT5-gQY7QHZrQegbs",
    authDomain: "hackathon713.firebaseapp.com",
    projectId: "hackathon713",
    storageBucket: "hackathon713.appspot.com",
    messagingSenderId: "52450275209",
    appId: "1:52450275209:web:8fd5867092e7d133f13b58"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
var db=firebase.firestore();
var storage = firebase.storage();
var storageRef=storage.refFromURL("gs://hackathon713.appspot.com/")
var alldocRef = db.collection("allThreads");
if(document.getElementById("google")){
document.getElementById("google").onclick=()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(JSON.stringify(result.user.displayName))
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error)
    })
}
}
var card=document.getElementById("card_template");
alldocRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let temp=document.createElement("div")
        temp.id=doc.id
        temp.innerHTML=card.innerHTML
        temp.innerHTML=temp.innerHTML.replace('TITLE_HERE',doc.data().uid);
        temp.innerHTML=temp.innerHTML.replace('INFO_HERE',doc.data().info);
        storageRef.child(doc.data().imgName).getDownloadURL()
        .then((url) => {
            temp.innerHTML=temp.innerHTML.replace('URL_HERE',url);
        })
        .catch((error) => {
            console.log(error)
        });
        document.getElementsByClassName("section2")[0].appendChild(temp)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, JSON.stringify(doc.data().uid));
    });
});