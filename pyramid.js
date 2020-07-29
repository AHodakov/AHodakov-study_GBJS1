console.log('Задание 5: *Нарисовать пирамиду с помощью console.log, у вашей пирамиды должно быть 20 рядов,')

let pyramid = ['x'];

do {
    console.log(pyramid.join(''));
    pyramid.push('x');
} while (pyramid.length <= 20);
