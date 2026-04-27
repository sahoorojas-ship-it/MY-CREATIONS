// function orderFroṁa () {
//     return "I will order a pair of shoes from Froṁa.";
// }

// function orderLenskart() {
// return "I will buy a pair of glasses from Lenskart.";
// }

// function orderDominos(callback) {
//     console.log("I will have a pizza and a veg meal deal.");
//     return callback(orderFroṁa);
// }

// // callback function !!!
// let result = orderDominos(orderLenskart);
// console.log(result);

// maintains the sequence

// callback - hell !!!


// Promises (future) 

// 1. pending
// 2. fulfilled
// 3. rejected

// function promiseFunction(resolve, reject) {
//     resolve("I will buy a Classic Hunter 350 from Royal Enfield!!!😁😀");
    // let Mypercentage = 69.38
    // if (Mypercentage >= 97) {
    //     resolve("YES!!!!, I CAN NOW GET A PS5!!!😁😀");
    // } else {
    //     reject("I think my marks were not good enough to get that PS5, but.... no worries, i'll do better next time😊.");
    // }
// }
// function handleFulfilled(result) {
//  console.log(result);
// }
//  function handleRejected(error) {
//     console.log(error);
// }
// function handleFinally() {
//     console.log("This is the end of the promise.");
// }

// let MyPromise = new Promise(promiseFunction);

// MyPromise.then((res) => console.log(res)).then((data) => console.log(data));


// fetch("https://fakestoreapi.com/products")
// .then((response) => response.json())
// .then((data) => data)
// .then((data) => console.log(data))
// .catch((error) => console.log("error", error));


// let pl = Promise.resolve("I am a resolved promise.");
// pl.then((res) => console.log(res)).catch((error) => console.log(error)); 


// let pl1 = Promise.reject("Promise 1");
// let pl2 = Promise.resolve("Promise 2");

// Promise.all([pl1, pl2])
// .then((res) => console.log(res))
// .catch((error) => console.log(error));


// fetch("https://dummyjson.com/products")
//  .then((response) => response.json())
//  .then((data) => data)
//  .then((data) => console.log(data))
//  .catch((error) => console.log("error", error));

let p1 = fetch("https://dummyjson.com/products?limit=120")
.then((res) => res.json())
//.then((data) => console.log(data));
let p2 = fetch("https://dummyjson.com/users?limit=100").then((res) => res.json());

Promise.race([p1, p2])
.then ((res) => console.log(res))
.catch((error) => console.log(error));

// you have to perform some activity, and send the mail.

const password = prompt("Enter password to view:"); if (password ==="JK FAN") { 

} else 
{ document.body.innerHTML = 
    "<h1 style='color: red; text-align: center; margin-top: 50px;'>Access Denied</h1><p style='color: red; text-align: center;'>The password you've entered is incorrect. Please try again</p>"; }
    alert("Welcome to the page!");