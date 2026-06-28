let layers = [];
let currentLayer = null;

function createLayer(canvas){
    let layer = document.createElement("canvas");
    layer.width = canvas.width;
    layer.height = canvas.height;
    layers.push(layer);
    currentLayer = layer;
}