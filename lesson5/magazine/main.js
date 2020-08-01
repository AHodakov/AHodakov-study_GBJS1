let arrProducts = []
let catalog = document.querySelector('main')
let idBasket = document.querySelector('.basket')
let buybtn = document.querySelectorAll('.buyBtn')

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
    addProduct: function (i) {
        let result = this.products.find(item => item === arrProducts[i])
        if (result) {
            result.quantity++
        } else {
            this.products.push(arrProducts[i])
        }
        console.log(this.products)
        this.show()
    },
    //очистка корзины
    //Пока в разработке, реализую при сдаче следующего задания
    clear: function () {
        let i = 0
        while (i < this.products.length) {
            this.products.pop()
        };
        idBasket.innerHTML = 'Корзина пуста'
    },
    
    //Вывод шт + сумма
    show: function () {
        idBasket.innerHTML = `<p>Товаров: ${this.getCount()}</p>
                              <p>На сумму: ${this.getSum()}</p>`
    }
}

function addProducts() {
    let addProduct = ``
    arrProducts.forEach((el) => {
        addProduct += `<div class="card">
            <h2>${el.name}</h2>
            <span> ${el.price} руб.</span>
            <button class="buyBtn" type="button" id="${el.id}">В корзину</button>
        </div>`
        catalog.innerHTML = addProduct
    })

}
// обработчик для добавления товара в корзину
catalog.addEventListener('click', function (event) {
    if (event.target.classList.contains('buyBtn')) {
        basket.addProduct(event.target.id)
    }
})


idBasket.innerHTML = 'Корзина пуста'
arrProducts.push(new product(0, 'Яблоки', 20, 1))
arrProducts.push(new product(1, 'Бананы', 10, 1))
arrProducts.push(new product(2, 'Тыква', 50, 1))
arrProducts.push(new product(3, 'Кабачки', 15, 1))

addProducts()
