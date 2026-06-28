let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let app = {
    tool: "brush",
    size: 5,
    color: "#000",
    drawing: false
};

document.getElementById("size").oninput = e => app.size = e.target.value;
document.getElementById("color").oninput = e => app.color = e.target.value;

function setTool(t){
    app.tool = t;
}

canvas.onmousedown = e => {
    app.drawing = true;
    saveState(canvas);
};

canvas.onmouseup = () => app.drawing = false;

canvas.onmousemove = e => {
    if(!app.drawing) return;

    if(app.tool === "brush"){
        drawBrush(ctx, e.offsetX, e.offsetY, app);
    }

    if(app.tool === "eraser"){
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = app.size * 2;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
    }
};