// const firebaseConfig = {
//     apiKey: "AIzaSyCAoSlg5BYN95mx3iosoA93YBqQJFecbW0",
//     authDomain: "ronquillo-contact-portfolio.firebaseapp.com",
//     databaseURL: "https://ronquillo-contact-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "ronquillo-contact-portfolio",
//     storageBucket: "ronquillo-contact-portfolio.firebasestorage.app",
//     messagingSenderId: "995849849476",
//     appId: "1:995849849476:web:720596dd8ad353ada6d0d1"
//   };

// // initialize firebase
// firebase.initializeApp(firebaseConfig);

// // reference your database
// var contactFormDB = firebase.database().ref("contactForm");

// document.getElementById("contactForm").addEventListener("submit", submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   var fname = getElementVal("fname");
//   var comp_name = getElementVal("comp_name");
//   var email = getElementVal("email");
//   var message = getElementVal("message");

//   saveMessages(fname, comp_name, email, message);

//   //   enable alert
//   document.querySelector(".alert").style.display = "block";

//   //   remove the alert
//   setTimeout(() => {
//     document.querySelector(".alert").style.display = "none";
//   }, 3000);

//   //   reset the form
//   document.getElementById("contactForm").reset();
// }

// const saveMessages = (fname, comp_name, email, message) => {
//   var newContactForm = contactFormDB.push();

//   newContactForm.set({
//     fname: fname,
//     comp_name: comp_name,
//     email: email,
//     message: message,
//   });
// };

// const getElementVal = (id) => {
//   return document.getElementById(id).value;
// };

function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

const texts = [
    "FRONT-END DEVELOPER",
    "WEB DESIGNER",
    "LEADER",
    "TEAM PLAYER",
]
let speed  =100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;
function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}
function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}
window.onload = typeWriter
