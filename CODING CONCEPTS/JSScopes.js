// 1: global scope

//  let abc = 10;
//  console.log(abc); 

// 2: functional scope!!!
// let abc = 100;
//  function sayHello(){
//     let abc = 10
//     console.log(abc);
// }
// sayHello();
// console.log(abc);


// 3: block scope!!!
// if (true) {
//     let  || const abc = 10;
// }
// console.log(abc);
// let and const are block scoped, which means they are only accessible within the block they are defined in. In this case, the variable abc is defined inside the if block and is not accessible outside of it, resulting in a ReferenceError when trying to log abc outside the block.
// only var is function scoped, which means it is accessible throughout the entire function it is defined in, regardless of block boundaries. If we had used var instead of let, the variable abc would have been hoisted to the top of the function and would have been accessible outside the if block, resulting in undefined being logged instead of a ReferenceError.
// if (true) {
//    var abc = 100;
// }
// console.log(abc);
// block can be if, for, while, switch, etc.
// a block is anything inside "{}"

//  function outer() {
//     var abc = 10;
//     function inner() {
//     abc++;
//     console.log(abc);
//     }
//     return inner;
//  }
// const fnc = outer();
// fnc();
// fnc();
// fnc();

//  function outer() {
//     var abc = 10;
//     abc++;
//     console.log(abc);
//  }

// outer();
// outer();
// outer();
//  memorization !!!!

// function factories!!
// function createATM () {
//     let balance = 100000000000;
//     return {
//         increment() {
//             balance++;
//             console.log(balance);
//         },
//         decrement() {
//             balance--;
//             console.log(balance);
//         },
//     };
// }
// let atm = createATM()
// atm.increment();
// atm.decrement();
// atm.increment();
// atm.increment();
// atm.increment();
// function hello() {
//     let obj = {
//     salary: 100000000000,
//         getSalary: function () {
//         console.log("hello");
//         },
    
//     };
//     return obj;  
// }

// function createUser(name, age) {
//     let balance = 100000000000;
//     return {
//         deposit(amount) {
//             balance += amount;
//             console.log(balance);
//         },
//         getBalance() {
//             return balance;
//         }    
//     };
// }   

// const user = createUser("ESAN", 30);
// user.deposit(100000);
// console.log(user.getBalance());

// localStorage and sessionStorage!!!

// localStorage.setItem("user", "pw skills");
// localStorage.setItem("promocode", "SHINCHANISSIGMAOP")

// let item = localStorage.getItem("token");
// console.log(item);

// sessionStorage = scopes to a single tab !!!
// irctc (login) = tab

// cookies !! - expiration !

