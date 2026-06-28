let undoStack = [];
let redoStack = [];

function saveState(canvas){
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

function undo(){
    if(undoStack.length){
        redoStack.push(canvas.toDataURL());
        let img = new Image();
        img.src = undoStack.pop();
        img.onload = ()=>ctx.drawImage(img,0,0);
    }
}

function redo(){
    if(redoStack.length){
        undoStack.push(canvas.toDataURL());
        let img = new Image();
        img.src = redoStack.pop();
        img.onload = ()=>ctx.drawImage(img,0,0);
    }
}