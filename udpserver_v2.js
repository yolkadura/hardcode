//создание сервера
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


//для нарезки
var dot = ':';

//сохранение во временные объекты
var time = {
    msg: '',
    adr: '',
    port: ''
};

//объект для вывода юзеру
var push = {
    user: '',
    x: '',
    y: '',
    map
};

//переменная для перехвата мапа
var info = undefined;

//переменная для вычисления расстояния или типа того
var length = undefined;
var bez = {
    x: undefined,
    y: undefined,
    z: undefined
};

//создание команды
var com = {
    push: 'push',
    pop: 'pop',
    len: 'len'
}

//создание мапы для базы юзеров
var map = new Map();

//функция на добавление новых юзеров
function addUserToList(key, value) {
    map.set(key, value);
};

//функция вырезания из введеного текста объектов
function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    
    console.log('\nСтрока от юзера: "' + stringToSplit + '"');
    console.log('Разделитель: "' + separator + '"');
    console.log('Всего  ' + arrayOfStrings.length + ' параметра: ' + arrayOfStrings.join(' / '));
    
    
    //создание объекта юзера
    var usr = {
        id: arrayOfStrings[0],
        com: arrayOfStrings[1],
        x: arrayOfStrings[2],
        y: arrayOfStrings[3]
    }
    
    

    //условие вывода на экран от команды
    if (usr.com == com.push) {

        push.x = usr.x;
        push.y = usr.y;
        push.user = usr.id;
       
        //свойство для мапы чтоб в значении было 2 объекта
        push.map = {
            x: usr.x.trim(),
            y: usr.y.trim()
        };

        addUserToList(usr.id, push.map); //вызов функции добавления юзера

        console.log('\nВаше имя ' + usr.id + ' Ваши координаты ' + usr.x + ' ' + usr.y);

    } else if ((usr.com.trim()) == com.pop)  { //трим нужен для удаления всяких пробелов
        
        info = map.get(usr.id); //передача данных из мапы в объект инфо

            if (info == undefined) { 
                server.send(`Пользователя ${usr.id} не существует`, time.port, time.adr)} 
            else {
                server.send(`Ваши координаты X:${info.x} Y:${info.y}\n`, time.port, time.adr)}
     
        
    } else if ((usr.com.trim()) == com.len) {
        
        info = map.get(usr.id); //вывод данных из мапы
        bez.x = usr.x - info.x;
        bez.y = usr.y - info.y;
        bez.z = bez.x + bez.y;
        length = Math.sqrt(bez.z);
        server.send(`Расстояние: ${length}\n`, time.port, time.adr);
        console.log(length);
    } else {
    console.log('\nwrong command')
    };
    
};

//создание событий сервера

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
  
server.on('message', (msg, rinfo) => {
    console.log(`Сервер получил: ${msg} От ${rinfo.address}:${rinfo.port}`);
    var splitmsg = msg.toString('ascii');
    time.msg = `Ответ: ${msg}`;
    time.adr = rinfo.address;
    time.port = rinfo.port;

    splitString(splitmsg, dot); //нарезка идет прям внутри ивента месседж
   
});
  
server.on('listening', () => {
    const address = server.address();
    console.log(`Сервер слушает ${address.address}:${address.port}`);
});
  
  
  
server.bind(3000);
  
  