const http = require('http');

const server = http.createServer();
var img = {
    bot = ![my logo](http://78.media.tumblr.com/avatar_459e1a2d2e10_128.pnj "don't touch")
}
server.on('request', (req, res) => {

    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`
        <!doctype>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Hello NODE!</title>
            </head>

            <body>
                <h1>BODY NODE ${img.bot} </h1>
                <button onclick="alert('Node is ALIVE!')">Push Me</button>

            </body>
        </html>
    `);
});

server.listen(3000, () => console.log('Сервер работает'));