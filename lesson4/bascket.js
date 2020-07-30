let arrProducts = []

class product {
    id;
    name;
    price;
    quantity;

    constructor(i, n, p, q) {
        this.id = i
        this.name = n
        this.price = p
        this.quantity = q
    }
}

//объект корзина
let basket = {
    products: [],
    //счетчик суммы
    getSum: function () {
        let sum = 0
        this.products.forEach((el, id) => {
            sum += el.quantity * el.price
        })
        return sum
    },

    //счетчик товаров 
    getCount: function () {
        let count = 0
        this.products.forEach((el) => {
            count = count + el.quantity
        })
        return count
    },
    //добавляю продукты в корзину
    addProduct: function () {
        alert('ФРУКТОВО-ОВОЩНАЯ КОРЗИНА! Для добавления товара введите количество от 1 и более. Все остальое не будет учитываться');
        arrProducts.forEach((el, id) => {
            let useData = parseInt(prompt('Товар ' + arrProducts[id].name + '. Какое количество желаете ? '), 10);
            if (useData > 0) {
                this.products.push(Object.assign({}, el))
                this.products[id].quantity = useData
            } else {
                this.products.push(0)
            }
        })
        this.products.forEach((el, id) => {
            if (el == 0) {
                this.products.splice(id, 1);
            }
        })
    },
    //очистка корзины
    clear: function () {
        let i = 0
        while (i < this.products.length) {
            this.products.pop()
        };
        return (console.log('Корзина пуста'))
    },
    //на будущее проверка пустая корзина или нет
    chekedBasket: false
}

arrProducts.push(new product(0, 'Яблоки', 20, 0))
arrProducts.push(new product(1, 'Бананы', 10, 0))
arrProducts.push(new product(2, 'Тыква', 50, 0))
arrProducts.push(new product(3, 'Кабачки', 15, 0))


console.log(arrProducts)
basket.addProduct()
console.log(basket.products)
console.log('Колличество товаров: ' + basket.getCount())
console.log('Сумма: ' + basket.getSum())
