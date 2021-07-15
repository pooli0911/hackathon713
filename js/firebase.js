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
var uid
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user;
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
    console.log("login as "+uid.displayName)
      // ...
    } else {
    }
});
var db=firebase.firestore();
var storage = firebase.storage();
var storageRef=storage.refFromURL("gs://hackathon713.appspot.com/")
var alldocRef = db.collection("allThreads");
var allaccRef = db.collection("allAccounts")
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
                if(errorCode=="auth/wrong-password"||"auth/user-not-found"){
                    alert=document.createElement("div")
                    alert.id="login_alert"
                    alert.innerText="密碼錯誤或帳號不存在"
                    document.getElementsByClassName("log_btn")[0].insertBefore(alert,document.getElementById("login"))
                }
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
                userCredential.user.updateProfile({
                    displayName:$('input[id=username]').val(),
                }).then(function() {
                    // Profile updated successfully!
                    console.log("sus")
                }, function(error) {
                });
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
let fileSelector
let fileList=[]
function readImage(imgnum,file) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }
  
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        document.getElementById("newphoto"+imgnum).setAttribute("src",event.target.result);
        document.getElementById("photo"+imgnum).style.display="flex";
        document.getElementById("delete"+imgnum).onclick=()=>{
            let thisnum=imgnum-1
            if(imgnum==2&&fileList.length>2){
                document.getElementById("newphoto2").setAttribute("src",document.getElementById("newphoto3").getAttribute("src"));
                document.getElementById("photo3").style.display="none";
            }
            else if(imgnum==1&&fileList.length>2){
                document.getElementById("newphoto1").setAttribute("src",document.getElementById("newphoto2").getAttribute("src"));
                document.getElementById("newphoto2").setAttribute("src",document.getElementById("newphoto3").getAttribute("src"));
                document.getElementById("photo3").style.display="none";
            }
            else if(imgnum==1&&fileList.length>1){
                document.getElementById("newphoto1").setAttribute("src",document.getElementById("newphoto2").getAttribute("src"));
                document.getElementById("photo2").style.display="none";
            }
            else{
                document.getElementById("photo"+imgnum).style.display="none";
            }
            fileList.pop(thisnum)
            console.log(fileList)
        }
    });
    reader.readAsDataURL(file);
}
var card=document.getElementById("card_template");
async function preparecards(){
    let adder=document.createElement("div")
    adder.innerHTML=document.getElementById("template0").innerHTML
    document.getElementsByClassName("section2")[0].appendChild(adder)
    document.getElementById("addnew").onclick=()=>{
        if(!uid){
            window.location="./login.html"
        }
        else{
        document.getElementsByClassName("section2")[0].innerHTML=document.getElementById("template2").innerHTML
        if(uid.displayName)document.getElementById("user_name").innerText=uid.displayName
        document.getElementById("current_time").innerText=new Date()
        if(uid.photoURL)document.getElementsByClassName("user_img")[0].setAttribute("src",uid.photoURL)
        fileSelector= document.getElementById('photo');
        fileSelector.addEventListener('change', (event) => {
            if(fileList==null||fileList.length<3){
                fileList.push(event.target.files[0]);
                readImage(fileList.length,fileList[fileList.length-1])
                document.getElementById('photo').value=null
            }
        });
        document.getElementById("back").onclick=()=>{
            document.getElementsByClassName("section2")[0].innerHTML=null
            preparecards();
        }
        document.getElementById("submit").onclick=()=>{
            var metadata = {
                contentType: 'image/jpeg'
            };
            console.log(uid.displayName)
            var data={
                uid: uid.displayName,
                info: document.getElementById("info").value,
                imgName: fileList[0]?fileList[0].name:"",
                imgName2: fileList[1]?fileList[1].name:"",
                imgName3: fileList[2]?fileList[2].name:""
            }
            alldocRef.doc(document.getElementById("title").value).set(data)
            .then(() => {
                console.log("sus")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            fileList.forEach((file)=>{
                // Upload file and metadata to the object 'images/mountains.jpg'
                var uploadTask = storageRef.child(file.name).put(file, metadata);
                
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    console.log(error)
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    });
                }
                );
            });
        }
        }  
    }
    alldocRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let temp=document.createElement("div")
            temp.id=doc.id
            temp.innerHTML=card.innerHTML
            console.log(JSON.stringify(doc.data()))
            temp.innerHTML=temp.innerHTML.replace('TITLE_HERE',doc.id);
            temp.innerHTML=temp.innerHTML.replace('INFO_HERE',doc.data().info);
            let imgurl,img2url,img3url
            storageRef.child(doc.data().imgName).getDownloadURL()
            .then((url) => {
                imgurl=url
                temp.innerHTML=temp.innerHTML.replace('URL_HERE',url);
            })
            .catch((error) => {
                console.log(error)
            });
            if(doc.data().imgName2!=null&&doc.data().imgName2!=""){
                storageRef.child(doc.data().imgName2).getDownloadURL()
                .then((url) => {
                    img2url=url
                    temp.innerHTML=temp.innerHTML.replace('URL2_HERE',url);
                })
                .catch((error) => {
                    console.log(error)
                });
            }
            if(doc.data().imgName3!=null&&doc.data().imgName3!=""){
                storageRef.child(doc.data().imgName3).getDownloadURL()
                .then((url) => {
                    img3url=url
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
                tempe.innerHTML=tempe.innerHTML.replace('TITLE_HERE',doct.id);
                tempe.innerHTML=tempe.innerHTML.replace('NAME_HERE',doct.data().uid);
                tempe.innerHTML=tempe.innerHTML.replace('INFO_HERE',doct.data().info);
                tempe.innerHTML=tempe.innerHTML.replace('URL_HERE',imgurl);
                tempe.innerHTML=tempe.innerHTML.replace('URL2_HERE',img2url);
                tempe.innerHTML=tempe.innerHTML.replace('URL3_HERE',img3url);                
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
