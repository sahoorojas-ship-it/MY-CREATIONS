let promise1 = new Promise((res, rej) => {
    if (x==1) {
        res("I will be resolved");
    } else {
        rej("I will be rejected!!");
    }
});


promise1.then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(Error)
}).finally(()=> {
    console.log("I will be executed in both cases");
})