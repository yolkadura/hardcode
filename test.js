console.clear();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
    

// rl.question('Who are U?\n\n', (answer) => {
    
//    console.log(`\nHello, ${answer}\nthank U for help me ^___^\n`);
    
//    rl.close();
//    });

function replyToAnswer(answer) {
    console.log('hi ' + answer);
    rl.close();    }


rl.question("hi?", replyToAnswer);





//test
const net = require('net');
const server = net.createServer((c) => {
    //'connection' listener
    console.log('client connected');
    c.on('end', () => {
	console.log('console disconnected');
    });
    c.write('hello\r\n');
    c.pipe(c);
});
server.on('error', (err) => {
    throw err;
});
server.listen(8124, () => {
    console.log('server bound');
});

//while (true) {
//    console.log("AHAHAHAHAHAHA")
//    }
