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




//fs.ReadStream наследует от stream.Readable
var stream = new fs.ReadStream('test.txt', 'utf8');
 
stream.on('readable', function(){
    var data = stream.read();
    if(data != null)console.log(data.length);
    console.log('\n' + data);
});
 
stream.on('end', function(){
   console.log("THE END");
});