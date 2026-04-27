// * METHODS OF SELECTIONS - 
// 1. getElementById
// 2. getElementsByClassName
// 3. getElementsByTagName
// 4. querySelector
// 5. querySelectorAll



async function handleApi() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        console.log(data);

        const table = document.getElementById("collection");

        data.map((item, index) => {
            table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td><button onclick="deleteRow(this)">Delete</button></td>
            </tr>`;
        });

    } catch (error) {
        console.log(error);
    }
}

handleApi();

// function deleteRow(button) {
//     const row = button.parentElement.parentElement;
//     row.remove();
// }
// or -

let table = document.getElementById("collection");
table.addEventListener("click", (e) => {
    // console.dir(e.target);
    if (e.target.tagName === "BUTTON") {
        const row = e.target.parentElement.parentElement;
        row.remove();

    }
    alert("You have deleted a row!");
});
const password = prompt("Enter password to view:"); 
if (password ==="JK FAN"){
     alert("Welcome to the page!"); 
} else 
{ document.body.innerHTML = 
    "<h1 style='color: red; text-align: center; margin-top: 50px;'>Access Denied</h1><p style='color: red; text-align: center;'>The password you've entered is incorrect. Please try again</p>"; }
    alert("Incorrect Password!");