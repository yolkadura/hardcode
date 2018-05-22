var fs = require('fs');     //подключение модуля файловой системы

fs.readFile('test.txt', 'utf8', (err,data) => {         //чтение файла и вывод в консоль
    if (err) throw err;
    console.log('\n' + data);
});

fs.readFile('test.json', 'utf8', (err,data) => {         //чтение массива и вывод в консоль
    if (err) throw err;
        var arr = data;
        arr = JSON.parse(arr);
    console.log('\n' + arr.name + ' ' + arr.age + ' ' + arr.race);
});


var flsnc = fs.readFileSync('test.txt', 'utf8');
console.log('\n' + flsnc);


var rdstr = fs.createReadStream('test.txt', 'utf8', { start: 1, end: 10 });
rdstr = rdstr.toString();
console.log('\n' + rdstr);