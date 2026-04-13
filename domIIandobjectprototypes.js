// * methods of selections - 

// 1. getElementsbyId
// 2. getElementsbyClassName
// 3. getElementsbyTagName
// 4. querySelector
// 5. querySelectorAll


async function handleApi() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
       const table = document.getElementById("collection");
       data.map((item) => {
        table.innerHTML += `<tbody>
         <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        </tr>
        </tbody>`;
         });
    } catch (error) {
        console.log(error);
    }
}
handleApi();

const password = prompt("Enter password to view:");
if (password ==="JK FAN") {
  
} else {
  document.body.innerHTML = "<h1 style='color: red; text-align: center; margin-top: 50px;'>Access Denied</h1><p style='color: red; text-align: center;'>The password you've entered is incorrect. Please try again</p>";
}


