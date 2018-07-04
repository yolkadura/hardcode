'use strict'; // этот код будет работать по современному стандарту ES5

var fs = require('fs');     //подключение модуля файловой системы

function WordCount(str) { 
    //return str.split(" ").length;
    var len = str.split(" ").length + str.split("\n").length - 1;
    return len;
};


fs.readFile('test2.txt', 'utf8', (err,data) => {         //чтение файла и вывод в консоль
    if (err) throw err;
    console.log(data);
    console.log(WordCount(data.toString()));
});



  
