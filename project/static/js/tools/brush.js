function drawBrush(ctx, x, y, state){
    ctx.lineWidth = state.size;
    ctx.strokeStyle = state.color;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
}