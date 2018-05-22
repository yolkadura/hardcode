var fs = require('fs');     //подключение модуля файловой системы

fs.readFile('test.txt', 'utf8', (err,data) => {         //чтение файла и вывод в консоль
    if (err) throw err;
    console.log(data);
});

fs.readFile('test.json', 'utf8', (err,data) => {         //чтение массива и вывод в консоль
    if (err) throw err;
        var arr = data;
        arr = JSON.parse(arr);
    console.log(arr.name + ' ' + arr.age + ' ' + arr.race);
});


var log = fs.readFileSync('test.txt', 'utf8');
console.log(log);
