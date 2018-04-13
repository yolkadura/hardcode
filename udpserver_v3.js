//создание сервера
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


//для нарезки
var dot = ':';

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
    
    console.log('\nСтрока от юзера: "' + stringToSplit.trim() + '"');
    console.log('Разделитель: "' + separator + '"');
    console.log('Всего  ' + arrayOfStrings.length + ' параметра: ' + arrayOfStrings.join(' / '));
    
    
    //создание объекта юзера
    var usr = {
        id: arrayOfStrings[0],
        com: arrayOfStrings[1],
        x: arrayOfStrings[2],
        y: arrayOfStrings[3]
    }

    return usr; //возвращение данных наружу
};

//создание событий сервера

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
  
server.on('message', (msg, rinfo) => {
    console.log(`Сервер получил: ${msg} От ${rinfo.address}:${rinfo.port}`);
    var splitmsg = msg.toString('ascii'); //перевод сообщения в строку стринг для нарезки. потому что изначально она буффер
        
    //объект для вывода юзеру
    var usr = splitString(splitmsg, dot);
    var pushmap;
        
    //условие вывода на экран от команды
    if (usr.com == com.push) {

            
        //свойство для мапы чтоб в значении было 2 объекта
        pushmap = {
            x: usr.x.trim(), //трим нужен для удаления всяких пробелов
            y: usr.y.trim()
        };

        addUserToList(usr.id, pushmap); //вызов функции добавления юзера

        console.log('\nИмя пользователя ' + usr.id + ' и его координаты ' + usr.x + ' ' + usr.y);

    } else if ((usr.com.trim()) == com.pop)  { //трим нужен для удаления всяких пробелов
        
        info = map.get(usr.id); //передача данных из мапы в объект инфо

            if (info == undefined) { 
                server.send(`Пользователя ${usr.id} не существует`, rinfo.port, rinfo.address)} 
            else {
                server.send(`Ваши координаты X:${info.x} Y:${info.y}\n`, rinfo.port, rinfo.address)}
     
        
    } else if ((usr.com.trim()) == com.len) {
        
        //переменная для вычисления расстояния или типа того
        var length = undefined;
        
        info = map.get(usr.id); //вывод данных из мапы
       
        length = Math.sqrt(Math.pow((usr.x - info.x), 2) + Math.pow((usr.y - info.y), 2)); //формула расстояния по координатам из гугла

        server.send(`Расстояние: ${length}\n`, rinfo.port, rinfo.address);
        console.log(length);

    } else {

        server.send('Неверная команда\n', rinfo.port, rinfo.address)
        console.log('\nНеверная команда')
    };
   
});
  
server.on('listening', () => {
    const address = server.address();
    console.log(`Сервер слушает ${address.address}:${address.port}`);
});
  
  
  
server.bind(3000);
