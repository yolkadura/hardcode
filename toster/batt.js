//подключение модов
const http = require('http');
const PORT = Number(process.argv[2] || 8000);
const child_process = require('child_process');

//создание маршрутов
const Routes = { 
    BATTERY: /\/battery\/?/
};


//создание данных статусов
const Status = {
    NOT_FOUND: 404,
    NOT_FOUND_MSG: 'Resourse not found',
    OK: 200,
    OK_MSG: 'Success',
    BATTERY_ERROR: 500,
    BATTERY_ERROR_MSG: 'Battery Error'
};

//готовый код с определением батарейки в линуксе
const switchConfigForCurrentOS = () => {
    switch (process.platform) { //нужная хрень для обращения к нужной оси
        case 'linux':
            return { //команда для башика
                command: 'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|energy-empty|energy-full"'
            };
        default: //дефолт хз зачем
            return {
                command: '',
            };
    }
}

//функция вывода статуса батареи
const getBatteryStatus = (response, config) => {
    child_process.exec(config.command, (err, stdout, stderr) => {
        if(err) {
            console.error('child_process filed' + err);
            renderResult(response, {
                status: Status.BATTERY_ERROR,
                message: stderr});
        } else {
            renderResult(response, {
                status: Status.OK,
                data: stdout});
        }
    });
}


//функция получения ответа
const renderResult = (response, data) => {
    response.writeHead(data.status, {'Content-type': 'application/json'});
    response.write(JSON.stringify(data));
    response.end();
};

//функция создание сервера хттп
const server = http.createServer((request, response) => {
    const requestUrl = request.url;
    console.log(requestUrl);
    const config = switchConfigForCurrentOS();
    
    //базовый роутинг. тестирование
    if (Routes.BATTERY.test(requestUrl)) {
    console.log('This is our battery');
    getBatteryStatus(response, config);
	} 
    
    else {
	console.log('wrong');
	
	renderResult(response, {
	status: Status.NOT_FOUND,
	message: Status.NOT_FOUND_MSG});
	}
    
}).listen(PORT);

console.log('Server running on port ' + PORT); //вывод порта на котором пашет сервер
console.log(`This server on ${process.platform}`); //вывод оси на котором пашет сервер


