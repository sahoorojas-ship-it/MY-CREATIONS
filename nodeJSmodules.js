const fs = require('fs');

fs.writeFileSync('NodeRunsProof.html', '<!DOCTYPE html>node<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Node.js Proof</title></head><body><h1>Node.js is running!</h1><p>This file was created by a Node.js script.</p></body></html>');
console.log('NodeRunsProof.html + localhost:3000 has been created successfully!!!!!! ');

const express = require('express');
const app = express();
const PORT = 3005;

app.get('/', (req, res) => {
res.send('<i><mark><b><em><u>Hello from Node.js! Hello from express</u></em></b></mark></i>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
