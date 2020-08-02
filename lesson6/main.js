let arrProducts = []
let catalog = document.querySelector('main')
let idBasket = document.querySelector('.infofield')
let buybtn = document.querySelectorAll('.buyBtn')
let btnClear = document.querySelector('.btnclear')

class Product {
    id;
    name;
    price;
    quantity;
    imgtag;
    imgquantity;
    imgcounter;

    constructor(i, n, p, q, it, iq, ic) {
        this.id = i
        this.name = n
        this.price = p
        this.quantity = q
        this.imgtag = it
        this.imgquantity = iq
        this.imgcounter = ic
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
//        let sum = this.products.reduce((total, curr) => total + curr)
//        return sum
//    },
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
        this.show()
    },
    //очистка корзины
    //Пока в разработке, реализую при сдаче следующего задания
    clear: function () {
        while (this.products.length !== 0) {
            //arrProducts[this.products.length].quantity = 0
            this.products.pop()
        };
        arrProducts.forEach((el)=> {el.quantity = 0})
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
        addProduct += `<div class="card" id="${el.id}">
            <h2>${el.name}</h2>
            <div class="cardimg">
            <p class="prev">&lang;</p>
            <img src="img/${el.imgtag}0.jpg" alt="${el.name}">
            <p class="next">&rang;</p> 
            </div> 
            <span> ${el.price} руб.</span>
            <button class="buyBtn" type="button">В корзину</button>
        </div>`
        catalog.innerHTML = addProduct
    })

}
// обработчик для добавления товара в корзину
catalog.addEventListener('click', function (event) {
    if (event.target.classList.contains('buyBtn')) {
        basket.addProduct(event.path[1].id)

    }
})
// обработчик для очистки корзины
btnClear.addEventListener('click', function (event) {
    if (event.target.classList.contains('btnclear')) {
        basket.clear()
    }
})

// обработчик листания картинок 
catalog.addEventListener('click', function (event) {
    if (event.target.classList.contains('next')) {

        let el = event.path[1].querySelector('img')
        let id = event.path[2].id

        if (arrProducts[id].imgcounter < arrProducts[id].imgquantity - 1) {
            arrProducts[id].imgcounter++
            el.src = `img/${arrProducts[id].imgtag}${arrProducts[id].imgcounter}.jpg`
        } else {
            arrProducts[id].imgcounter = 0
            el.src = `img/${arrProducts[id].imgtag}${arrProducts[id].imgcounter}.jpg`
        }
    } else if (event.target.classList.contains('prev')) {

        let el = event.path[1].querySelector('img')
        let id = event.path[2].id
        arrProducts[id].imgcounter--

        if (arrProducts[id].imgcounter >= 0) {
            el.src = `img/${arrProducts[id].imgtag}${arrProducts[id].imgcounter}.jpg`
        } else {
            arrProducts[id].imgcounter = arrProducts[id].imgquantity - 1
            el.src = `img/${arrProducts[id].imgtag}${arrProducts[id].imgcounter}.jpg`
        }
    }
})



idBasket.innerHTML = '<p>Корзина пуста</p>'
arrProducts.push(new Product(0, 'Яблоки', 20, 1, 'apple', 3, 0))
arrProducts.push(new Product(1, 'Бананы', 10, 1, 'banana', 3, 0))
arrProducts.push(new Product(2, 'Тыква', 50, 1, 'pumpkin', 2, 0))
arrProducts.push(new Product(3, 'Кабачки', 15, 1, 'squash', 2, 0))

addProducts()
