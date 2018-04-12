//создание сервера
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


//для нарезки
var dot = ':';

//сохранение во временные объекты
var msgc = '';
var addressc = '';
var portc = '';
//объект для вывода юзеру
var push = {
    user: '',
    ARG1: '',
    ARG2: '',
    map
}
//создание мапы для базы юзеров
var map = new Map();
//функция на добавление новых юзеров
function addUserToList(key, value) {
    map.set(key, value);
   
}

function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    
    console.log('\nСтрока от юзера: "' + stringToSplit + '"');
    console.log('Разделитель: "' + separator + '"');
    console.log('Всего  ' + arrayOfStrings.length + ' параметра: ' + arrayOfStrings.join(' / '));
    
    //создание команды
    var Action = {
        COMMAND1: 'push',
        COMMAND2: 'pop'
    }
    //создание объекта юзера
    var usr = {
        USER_ID: arrayOfStrings[0],
        COMMAND: arrayOfStrings[1],
        ARG1: arrayOfStrings[2],
        ARG2: arrayOfStrings[3]
    }
    
    

    //условие вывода на экран от команды
    if (Action.COMMAND1 == usr.COMMAND) {

        push.ARG1 = usr.ARG1;
        push.ARG2 = usr.ARG2;
        push.user = usr.USER_ID;
        push.map = `x: ${usr.ARG1} y: ${usr.ARG2}`; //свойство для мапы чтоб в значении было 2 объекта


        addUserToList(usr.USER_ID, push.map); //вызов функции добавления юзера

    console.log('\nВаше имя ' + usr.USER_ID + ' Ваши координаты ' + usr.ARG1 + ' ' + usr.ARG2);

    } else if (Action.COMMAND2 == (usr.COMMAND.trim()))  { //трим нужен для удаления всяких пробелов
        //server.send(msgc, portc, addressc);
        //server.send(`Ваши координаты X: ${push.ARG1} Y: ${push.ARG2}`, portc, addressc);
        server.send('Ваши координаты ' + map.get(usr.USER_ID), portc, addressc); //вывод юзеру данных из мапы
        console.log(map.get(usr.USER_ID));
        
    }
    
    else {
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
  msgc = `answer: ${msg}`;
  addressc = rinfo.address;
  portc = rinfo.port;
  splitString(splitmsg, dot);
 
 });

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});



server.bind(3000);

