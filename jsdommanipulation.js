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
  heading.style.letterSpacing = "5px";
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
description.style.fontSize = "25px";
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
  description.style.letterSpacing = "3px";
});

description.addEventListener("mouseout", () => {
  description.style.transform = "scale(1) rotate(5deg) skew(0deg, 0deg)";
  description.style.boxShadow = "2px 2px 5px rgb(228, 59, 59)";
  description.style.letterSpacing = "normal";
});


