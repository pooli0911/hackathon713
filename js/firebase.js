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
const user = firebase.auth().currentUser;
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
        window.location="./"
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
if(document.getElementById("login")){
    document.getElementById("login").onclick=()=>{
        if($('input[id=email]').val()!=null&&$('input[id=password]').val()!=null){
            firebase.auth()
            .signInWithEmailAndPassword($('input[id=email]').val(),$('input[id=password]').val())
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(userCredential)
                window.location="./"
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
            });
        }
    }
}
if(document.getElementById("signup")){
    document.getElementById("signup").onclick=()=>{
        if($('input[id=email]').val()!=null&&$('input[id=password]').val()!=null&&$('input[id=username]').val()!=null){
            firebase.auth()
            .createUserWithEmailAndPassword($('input[id=email]').val(),$('input[id=password]').val())
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(userCredential)
                window.location="./"
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
            });
        }
    }
}
var card=document.getElementById("card_template");
async function preparecards(){
    let adder=document.createElement("div")
    adder.innerHTML=document.getElementById("template0").innerHTML
    document.getElementsByClassName("section2")[0].appendChild(adder)
    document.getElementById("addnew").onclick=()=>{
        document.getElementsByClassName("section2")[0].innerHTML=document.getElementById("template2").innerHTML
        document.getElementById("back").onclick=()=>{
            document.getElementsByClassName("section2")[0].innerHTML=null
            preparecards();
        }
    }
    alldocRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let temp=document.createElement("div")
            temp.id=doc.id
            temp.innerHTML=card.innerHTML
            temp.innerHTML=temp.innerHTML.replace('TITLE_HERE',doc.data().uid);
            temp.innerHTML=temp.innerHTML.replace('INFO_HERE',doc.data().info);
            let imgurl
            storageRef.child(doc.data().imgName).getDownloadURL()
            .then((url) => {
                imgurl=url
                temp.innerHTML=temp.innerHTML.replace('URL_HERE',url);
            })
            .catch((error) => {
                console.log(error)
            });
            let imglist=[]
            if(doc.data().imgName2!=null&&doc.data().imgName2!=""){
                storageRef.child(doc.data().imgName2).getDownloadURL()
                .then((url) => {
                    imglist[0]=url
                    temp.innerHTML=temp.innerHTML.replace('URL2_HERE',url);
                })
                .catch((error) => {
                    console.log(error)
                });
            }
            if(doc.data().imgName3!=null&&doc.data().imgName3!=""){
                storageRef.child(doc.data().imgName3).getDownloadURL()
                .then((url) => {
                    imglist[1]=url
                    temp.innerHTML=temp.innerHTML.replace('URL3_HERE',url);
                })
                .catch((error) => {
                    console.log(error)
                });
            }
            document.getElementsByClassName("section2")[0].appendChild(temp)
            $('#'+temp.id).on('click',()=>{
                console.log(temp.id)
                alldocRef.doc(temp.id).get().then((doct) => {
                let tempe=document.createElement("div")
                tempe.innerHTML=document.getElementById("template3").innerHTML
                tempe.innerHTML=tempe.innerHTML.replace('TITLE_HERE',doct.data().uid);
                tempe.innerHTML=tempe.innerHTML.replace('INFO_HERE',doct.data().info);
                tempe.innerHTML=tempe.innerHTML.replace('URL_HERE',imgurl);
                tempe.innerHTML=tempe.innerHTML.replace('URL2_HERE',imglist[0]);
                tempe.innerHTML=tempe.innerHTML.replace('URL3_HERE',imglist[1]);
                console.log(doct.data().uid)
                document.getElementsByClassName("section2")[0].innerHTML=tempe.innerHTML
                document.getElementById("back").onclick=()=>{
                    document.getElementsByClassName("section2")[0].innerHTML=null
                    preparecards();
                }
                });
            });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, JSON.stringify(doc.data().uid));
        });
    });
}
if(card!=null){
    preparecards();
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      if(user!=null){
        document.getElementsByClassName("navbarItem4")[0].setAttribute("href","#")
        document.getElementsByClassName("navbarItem4")[0].innerText="登出"
        document.getElementsByClassName("navbarItem4")[0].onclick=()=>{
            firebase.auth().signOut().then(() => {
                console.log("sus")
                window.location="/"
            }).catch((error) => {
                console.log(error)
            });
        }
    }
    console.log("login as "+uid)
      // ...
    } else {
    }
});