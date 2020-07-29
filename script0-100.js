console.log('Задание 1: c помощью цикла while вывести все простые числа в промежутке от 0 до 100')

let i = 0;
let counter = 0;
const n = 100;

while (i <= n) {
    let j = 2;
    while ((j <= i) && (i % j !== 0)) {
        j++;
    }
    if (j == i) {
        console.log(i);
        counter++;
    }
    i++;
}
console.log('количество чисел: ' + counter);
