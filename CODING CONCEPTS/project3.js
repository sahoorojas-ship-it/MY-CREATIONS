// 1: global scope

// let abc = 100;
// console.log(abc);

// 2: function scope

// let abc = 100;

// function sayHello() {
//     let abc = 10;
//     console.log(abc);
// }

// sayHello();
// console.log(abc);

// 3: block scope

// if (true) {
//     let||const abc = 10;
// }
// console.log(abc);

// let and const are block scoped, which means they are only accessible within the block they are defined in.
//  In this case, the variable abc is defined inside the if block and is not accessible outside of it, resulting in a ReferenceError when trying to log abc outside the block.
// only var is function scoped, which means it is accessible throughout the entire function it is defined in, regardless of block boundaries.
//  If we had used var instead of let, the variable abc would have been hoisted to the top of the function and would have been accessible outside the if block, resulting in undefined being logged instead of a ReferenceError.

// 4: closure

// if (true) {
//     var abc = 100;
// }
// console.log(abc);

// block can be if, for, while, switch, etc.
// a block is anything inside "{}"

// function outer() {
//     var abc = 10;
//      function inner() {
//      abc++;
//     console.log(abc);
//      }   
//         return inner;
//  }
//  const fnc = outer();
//  fnc();
//  fnc();
//  fnc();

//function outer() {
 //   var abc = 10;
//     abc++;
//     console.log(abc);
// }

// outer();
// outer();
// outer();


// function createATM() {
//     let balance = 100000000000;
//     return {
//         increment() {
//             balance++;
//             console.log(balance);
//         },

    
//        decrement () {
//         balance--;
//         console.log(balance);
//         },
//     }; 
// }

// let atm = createATM();
// atm.increment();
// atm.decrement();
//  atm.increment();
// atm.increment();

// function createUser(name, age) {
//      let balance = 100000000000;
//      return {
//          deposit(amount) {
//              balance += amount;
//              console.log(balance);
//          },
//          getBalance() {
//              return balance;
//          }    
//      };
//  }   

//  const user = createUser("ESAN", 30);
//  user.deposit(100000);
//  console.log(user.getBalance());

// Local Storage and Session Storage

// localStorage.setItem("name", "ESAN");
// localStorage.setItem("age", "30");
// localStorage.setItem("city", "Bhubaneshwar");
// console.log(localStorage.getItem("name"));
// console.log(localStorage.getItem("age"));
// console.log(localStorage.getItem("city"));

// sessionStorage
// .setItem("name", "ESAN");
// sessionStorage.setItem("age", "30");
// sessionStorage.setItem("city", "Bhubaneshwar");
// console.log(sessionStorage.getItem("name"));
// console.log(sessionStorage.getItem("age"));
// console.log(sessionStorage.getItem("city"));