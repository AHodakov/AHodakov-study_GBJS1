let fruit = ['яблоки', 'бананы', 'тыква', 'кабачки'];
let price = [2, 1, 5, 1];
let quantity = [];
let bascket = [];

console.log('Фруктово-овощная корзина :P')
console.log(fruit);
console.log('Цены на товары: ' + price);

for (let i = 0; i < fruit.length; ++i) {
    quantity.push(parseInt(prompt('Товар ' + fruit[i] + ' . Какое количество желаете ? '), 10));
}

console.log('Указанное количество: ' + quantity);

function countBasketPrice() {
    for (let i = 0; i < fruit.length; ++i) {
        if (quantity[i] > 0) {
            bascket.push(quantity[i] * price[i]);
        } else {
            bascket.push(0);
        }
    }
    console.log(bascket);
    let sum = bascket.reduce((total, curr) => total + curr);
    return (sum);
}

console.log('Сумма вашей корзины: ' + countBasketPrice());
