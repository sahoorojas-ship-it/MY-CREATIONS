// !! DOM = Document Object Model 
  let heading = document.getElementById("heading");
  heading.style.color = "navy";
  heading.style.fontFamily= "Verdana, Geneva, sans-serif";
  heading.style.fontSize = "35px";
  heading.style.textAlign = "center";
  heading.style.textDecoration = "underline";
  heading.style.textDecorationColor = "teal";
  heading.style.textDecorationThickness = "3px";
  heading.style.textDecorationStyle = "wavy";
  heading.style.textShadow = "2px 2px 4px rgb(255, 255, 255)";
  heading.style.textTransform = "case";   
  heading.style.backgroundColor = "lightblue";
  heading.style.padding = "10px";
  heading.style.border = "2px solid navy";
  heading.style.borderRadius = "10px";
  heading.style.marginTop = "20px";heading.style.marginBottom = "20px";
heading.style.marginLeft = "auto";
heading.style.marginRight = "auto";
heading.style.boxShadow = "2px 2px 5px navy";
heading.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
heading.addEventListener("mouseover", () => {
  heading.style.transform = "scale(1.2) rotate(3deg)";
  heading.style.boxShadow = "0 0 30px cyan, 0 0 60px blue";
  heading.style.letterSpacing = "4px";
});

heading.addEventListener("mouseout", () => {
  heading.style.transform = "scale(1) rotate(0deg)";
  heading.style.boxShadow = "2px 2px 5px navy";
  heading.style.letterSpacing = "normal";
});



//console.log(heading);
// or:
//console.log(window);

let description = document.getElementById("description");
description.style.color = "rgb(228, 59, 59)";
description.style.fontSize = "20px";
description.style.fontFamily = "Arial, Helvetica, sans-serif";
description.style.textAlign = "center";
description.style.textShadow = "1px 1px 2px rgb(0, 0, 0)";
description.style.textTransform = "capitalize";
description.style.backgroundColor = "lightyellow";
description.style.padding = "10px";
description.style.border = "2px solid rgb(228, 59, 59)";
description.style.borderRadius = "10px";
description.style.marginTop = "20px";
description.style.marginBottom = "20px";
description.style.width = "fit-content";
description.style.marginLeft = "auto";
description.style.marginRight = "auto";
description.style.boxShadow = "2px 2px 5px rgb(228, 59, 59)";
description.style.textDecoration = "underline";
description.style.textDecorationColor = "rgb(228, 59, 59)";
description.style.textDecorationThickness = "2px";
description.style.textDecorationStyle = "striped";
description.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
description.addEventListener("mouseover", () => {
  description.style.transform = "scale(1.2) rotate(-5deg) skew(10deg, 5deg)";
  description.style.boxShadow = "0 0 30px red, 0 0 60px orange";
  description.style.letterSpacing = "4px";
});

description.addEventListener("mouseout", () => {
  description.style.transform = "scale(1) rotate(5deg) skew(0deg, 0deg)";
  description.style.boxShadow = "2px 2px 5px rgb(228, 59, 59)";
  description.style.letterSpacing = "normal";
});

  let content = document.querySelectorAll("#content > p");
  content.forEach((paragraph, index) => {
    paragraph.style.color = index % 2 === 0 ? "green" : "purple";
    paragraph.style.fontSize = "20px";
    paragraph.style.fontFamily = "Georgia, serif";
    paragraph.style.textAlign = "center";
    paragraph.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";  
    paragraph.style.textTransform = "case";
    paragraph.style.backgroundColor = index % 2 === 0 ? "lightgreen" : "lavender";
    paragraph.style.padding = "10px";
    paragraph.style.border = "2px solid " + (index % 2 === 0 ? "green" : "purple");
    paragraph.style.borderRadius = "10px";
    paragraph.style.marginTop = "10px";
    paragraph.style.marginBottom = "10px";
    paragraph.style.width = "fit-content";
    paragraph.style.marginLeft = "auto";
    paragraph.style.marginRight = "auto";
    paragraph.style.boxShadow = "2px 2px 5px " + (index % 2 === 0 ? "green" : "purple");
    paragraph.style.textDecoration = "underline";
    paragraph.style.textDecorationColor = index % 2 === 0 ? "green" : "purple";
    paragraph.style.textDecorationThickness = "2px";
    paragraph.style.textDecorationStyle = "dashed";
    paragraph.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
paragraph.addEventListener("mouseover", () => {
  paragraph.style.transform = "scale(1.2) rotate(-5deg) skew(10deg, 5deg)";
  paragraph.style.boxShadow = "0 0 30px green : purple, 0 0 80px dark green : magenta";
  paragraph.style.letterSpacing = "4px";
});

paragraph.addEventListener("mouseout", () => {
  paragraph.style.transform = "scale(1) rotate(0deg)";
  paragraph.style.boxShadow = "2px 2px 5px " + (index % 2 === 0 ? "green" : "purple");
  paragraph.style.letterSpacing = "normal";
});
  });


  let element = document.getElementsByClassName("card");
  element[0].style.color = "white";
  element[0].style.fontSize = "20px";
  element[0].style.fontFamily = "Arial, Helvetica, sans-serif";
  element[0].style.textAlign = "center";
  element[0].style.textShadow = "1px 1px 2px rgb(0, 0, 0)";
  element[0].style.textTransform = "capitalize";
  element[0].style.backgroundColor = "teal";
  element[0].style.padding = "20px";
  element[0].style.border = "2px solid teal";
  element[0].style.borderRadius = "10px";
  element[0].style.marginTop = "20px";
  element[0].style.marginBottom = "20px";
  element[0].style.width = "fit-content";
  element[0].style.marginLeft = "auto";
  element[0].style.marginRight = "auto";
  element[0].style.boxShadow = "2px 2px 5px teal";
  element[0].style.textDecoration = "underline";
  element[0].style.textDecorationColor = "teal";
  element[0].style.textDecorationThickness = "2px";
  element[0].style.textDecorationStyle = "dotted";
  element[0].style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
element[0].addEventListener("mouseover", () => {
  element[0].style.transform = "scale(1.2) rotate(5deg) skew(-10deg, -5deg)";
  element[0].style.boxShadow = "0 0 30px teal, 0 0 60px cyan";
  element[0].style.letterSpacing = "4px";
});
element[0].addEventListener("mouseout", () => {
  element[0].style.transform = "scale(1) rotate(0deg)";
  element[0].style.boxShadow = "2px 2px 5px teal";
  element[0].style.letterSpacing = "normal";
});


const heart = document.getElementById("heart");

console.log("Heart element:", heart); // 👈 debug line

heart.addEventListener("mouseover", () => {
    console.log("Mouse over 💖"); // 👈 debug
    heart.style.transform = "scale(10)";
    heart.style.transition = "0.3s";
    heart.style.display = "inline-block";
});

heart.addEventListener("mouseout", () => {
    console.log("Mouse out 💖"); // 👈 debug
    heart.style.transform = "scale(1)";
});


let child = document.createElement("div");
let newEL = document.createElement("p");
newEL.textContent = "This is a new paragraph added by JavaScript.";
document.body.appendChild(child);
child.appendChild(newEL);
newEL.style.color = "blue";
newEL.style.fontSize = "18px";
newEL.style.fontFamily = "Arial, Helvetica, sans-serif";
newEL.style.textAlign = "center";
newEL.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
newEL.style.textTransform = "capitalize";
newEL.style.backgroundColor = "lightgray";
newEL.style.padding = "10px";
newEL.style.border = "2px solid blue";
newEL.style.borderRadius = "10px";
newEL.style.marginTop = "20px";
newEL.style.marginBottom = "20px";
newEL.style.width = "fit-content";
newEL.style.marginLeft = "auto";
newEL.style.marginRight = "auto";
newEL.style.boxShadow = "2px 2px 5px blue";
newEL.style.textDecoration = "underline";
newEL.style.textDecorationColor = "blue";
newEL.style.textDecorationThickness = "2px";
newEL.style.textDecorationStyle = "dashed";
newEL.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
newEL.addEventListener("mouseover", () => {
  newEL.style.transform = "scale(1.2) rotate(-5deg) skew(10deg, 5deg)";
  newEL.style.boxShadow = "0 0 30px blue, 0 0 60px cyan";
  newEL.style.letterSpacing = "4px";
});
newEL.addEventListener("mouseout", () => {
  newEL.style.transform = "scale(1) rotate(0deg)";
  newEL.style.boxShadow = "2px 2px 5px blue";
  newEL.style.letterSpacing = "normal";
});

document.body.appendChild(newEL);


document.addEventListener("DOMContentLoaded", () => {
  let table = document.querySelector("#table");
  let rows = document.querySelectorAll("#table tr");
  let cells = document.querySelectorAll("#table th, #table td");

  // 🎨 Style table
  table.style.borderCollapse = "collapse";
  table.style.margin = "20px auto";
  table.style.fontFamily = "Arial, Helvetica, sans-serif";

  // 🎨 Style all cells
  cells.forEach((cell) => {
    cell.style.border = "2px solid darkblue";
    cell.style.padding = "10px";
    cell.style.textAlign = "center";
  });

  // 🎨 Style header row
  let headerCells = document.querySelectorAll("#table th");
  headerCells.forEach((th) => {
    th.style.backgroundColor = "darkblue";
    th.style.color = "white";
  });

  // 🎨 Style rows + add effects
  rows.forEach((row, index) => {
    if (index === 0) return; // skip header

    row.style.backgroundColor = "lightblue";
    row.style.color = "darkblue";
    row.style.textShadow = "1px 1px 2px rgba(0,0,0,0.5)";
    row.style.textDecoration = "underline dashed darkblue";
    row.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

    // ✨ Hover effect
    row.addEventListener("mouseover", () => {
      row.style.transform = "scale(1.1) rotate(2deg)";
      row.style.boxShadow = "0 0 20px darkblue, 0 0 40px cyan";
      row.style.letterSpacing = "3px";
    });

    row.addEventListener("mouseout", () => {
      row.style.transform = "scale(1)";
      row.style.boxShadow = "none";
      row.style.letterSpacing = "normal";
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  let table = document.querySelector("#table2");
  let rows = document.querySelectorAll("#table2 tr");
  let cells = document.querySelectorAll("#table2 th, #table2 td");

  // 📦 Table styling
  table.style.borderCollapse = "collapse";
  table.style.margin = "40px auto";
  table.style.fontFamily = "Arial";

  // 🧱 Cell styling
  cells.forEach((cell) => {
    cell.style.border = "2px solid black";
    cell.style.padding = "10px";
    cell.style.textAlign = "center";
  });

  // 🔵 Header styling
  let headers = document.querySelectorAll("#table th");
  headers.forEach((th) => {
    th.style.backgroundColor = "black";
    th.style.color = "white";
  });

  // 🌈 Row styling + hover effect
  rows.forEach((row, index) => {
    if (index === 0) return;

    row.style.backgroundColor = "lightblue";
    row.style.transition = "0.3s";

    row.addEventListener("mouseover", () => {
      row.style.backgroundColor = "orange";
      row.style.transform = "scale(1.05)";
    });

    row.addEventListener("mouseout", () => {
      row.style.backgroundColor = "lightblue";
      row.style.transform = "scale(1)";
    });
  });
});


const password = prompt("Enter password to view:");
if (password ==="world's best developer") {
  
} else {
  document.body.innerHTML = "<h1 style='color: red; text-align: center; margin-top: 50px;'>Access Denied</h1><p style='color: red; text-align: center;'>The password you've entered is incorrect. Please try again</p>";
}