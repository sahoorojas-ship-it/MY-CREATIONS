// let promise1 = new Promise((res, rej) => {
//     let x=2; 
//     if (x==1) {
//         res("I will be resolved");
//     } else {
//         rej("I will be rejected!!");
//     }
// });


// promise1.then((res) => {
//     console.log(res);
// }).catch((error) => {
//     console.log(Error)
// }).finally(()=> {
//     console.log("I will be executed in both cases");
// })

// or :

let p1= Promise.resolve("Promise 1 ......");
let p2= Promise.reject("Promise 2 ......");

const handlePromise = async()  => {
    try {
    // !!:promise.resolve(10)
    let response = await Promise.allSettled([p1, p2]);
        // let response = await fetch("https://fakestoreapi.com/products");
        // const json = await response.json();
        console.log(response);
    }catch (error) {
        console.log("error", error);
    } finally {
        console.log("I will be executed in both cases");
    }
};


handlePromise(); 