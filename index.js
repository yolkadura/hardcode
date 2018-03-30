console.clear();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
    

rl.question('Who are U?\n\n', (answer) => {
    
    console.log(`\nHello, ${answer}\nthank U for help me ^___^\n`);
    
rl.close();
    });