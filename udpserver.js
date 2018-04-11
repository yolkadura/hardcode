//создание сервера
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

//для нарезки
var dot = ':';


function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    
    console.log('\nСтрока от юзера: "' + stringToSplit + '"');
    console.log('Разделитель: "' + separator + '"');
    console.log('Всего  ' + arrayOfStrings.length + ' параметра: ' + arrayOfStrings.join(' / '));
    
    //создание команды
    var Action = {
        COMMAND: 'push'
    }
    //создание объекта юзера
    var usr = {
        USER_ID: arrayOfStrings[0],
        COMMAND: arrayOfStrings[1],
        ARG1: arrayOfStrings[2],
        ARG2: arrayOfStrings[3]
    }
    
    //условие вывода на экран от команды
    if (Action.COMMAND == usr.COMMAND) {
    console.log('\nВаше имя ' + usr.USER_ID + ' Ваши координаты ' + usr.ARG1 + ' ' + usr.ARG2);

    } else {
    console.log('\nwrong command')};
    

  };
  

//создание событий сервера
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  var splitmsg = msg.toString('ascii');
  splitString(splitmsg, dot);
 });

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(3000);
