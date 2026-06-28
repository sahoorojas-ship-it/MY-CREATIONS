// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!! How are you people doing? Great? If yes, then boooom!!!, you\'re living the best life everrrr!!!');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const { createServer } = require("node:http");

createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
        <button id="play">Play Game</button>

        <script>
            const button = document.getElementById("play");

            button.addEventListener("click", () => {
                window.location.href = "http://127.0.0.1:5500/maze/m.html";
            });
        </script>
    `);
}).listen(3000, "127.0.0.1");

console.log("Server running on http://127.0.0.1:3000");