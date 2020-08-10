
class Products {
    id;
    name = ''
    price = 0
    quantity = 1
    imgTag = ''
    imgQuantity = ''
    imgCounter = ''

    constructor(i, n, p, it, iq, ic) {
        this.id = i
        this.name = n
        this.price = p
        this.imgTag = it
        this.imgQuantity = iq
        this.imgCounter = ic
    }
    inc() {
        this.quantity++
    }
    dec() {
        this.quantity--
    }

    getAddBtnBuy() {
        const btn = document.createElement('button')
        btn.classList.add('buy__btn')
        btn.innerText = 'В корзину'

        btn.addEventListener('click', () => {
            const userCart = new Cart()
            userCart.add(this)
        })

        return btn
    }
    getMinusBtn() {
        const btn = document.createElement('button')
        btn.classList.add('minus__btn')
        btn.innerText = '-'

        btn.addEventListener('click', () => {
            const userCart = new Cart()
            userCart.remove(this)
        })

        return btn
    }
    getPlusBtn() {
        const btn = document.createElement('button')
        btn.classList.add('plus__btn')
        btn.innerText = '+'

        btn.addEventListener('click', () => {
            const userCart = new Cart()
            userCart.add(this)

        })

        return btn
    }

    getNextImgBtn() {
        const btn = document.createElement('button')
        btn.classList.add('next')
        btn.innerText = ' >> '


        btn.addEventListener('click', function (event) {
            if (event.target.classList.contains('next')) {

                let el = event.path[2].querySelector('img')
                let id = event.path[2].querySelector('.product__card').id

                if (arrProductList.items[id].imgCounter < arrProductList.items[id].imgQuantity - 1) {
                    arrProductList.items[id].imgCounter++
                    el.src = `img/${arrProductList.items[id].imgTag}${arrProductList.items[id].imgCounter}.jpg`
                } else {
                    arrProductList.items[id].imgCounter = 0
                    el.src = `img/${arrProductList.items[id].imgTag}${arrProductList.items[id].imgCounter}.jpg`
                }
            }
        })
        return btn
    }
    getPrevImgBtn() {
        const btn = document.createElement('button')
        btn.classList.add('prev')
        btn.innerText = ' << '

        btn.addEventListener('click', function (event) {
            if (event.target.classList.contains('prev')) {

                let el = event.path[2].querySelector('img')
                let id = event.path[2].querySelector('.product__card').id
                arrProductList.items[id].imgCounter--

                if (arrProductList.items[id].imgCounter >= 0) {
                    el.src = `img/${arrProductList.items[id].imgTag}${arrProductList.items[id].imgCounter}.jpg`
                } else {
                    arrProductList.items[id].imgCounter = arrProductList.items[id].imgQuantity - 1
                    el.src = `img/${arrProductList.items[id].imgTag}${arrProductList.items[id].imgCounter}.jpg`
                }
            }
        })
        return btn
    }

    getNavImgBtn() {
        const {
            name,
            imgTag
        } = this
        const block = document.createElement('div')
        block.classList.add('card__img_nav')
        block.appendChild(this.getPrevImgBtn())
        block.appendChild(this.getNextImgBtn())
        return block
    }

    getMainTemplate() {
        const {
            id,
            price,
            name,
            imgTag,

        } = this

        const block = document.createElement('div')
        block.innerHTML = `<div class="product__card" id="${id}">
            <h2>${name}</h2>
            <p>Цена: ${price}</p>
           <img src="img/${imgTag}0.jpg" alt="${name}">`

        block.appendChild(this.getNavImgBtn())
        block.appendChild(this.getAddBtnBuy())
        return block;
    }

    getCartTemplate() {
        const {
            price,
            name,
            quantity,
            imgTag
        } = this

        const block = document.createElement('div')
        block.classList.add('cart__card')

        const blockImg = document.createElement('img')
        blockImg.src = `img/${imgTag}0.jpg`
        blockImg.width = "100"

        const blockName = document.createElement('p')
        blockName.innerText = `${name}`

        const blockPrice = document.createElement('p')
        blockPrice.innerText = `${price}`

        const blockQuantity = document.createElement('p')
        blockQuantity.innerText = `${quantity}`

        const blockSum = document.createElement('p')
        blockSum.innerText = `${price * quantity}`

        block.appendChild(blockImg)
        block.appendChild(blockName)
        block.appendChild(blockPrice)
        block.appendChild(this.getMinusBtn())
        block.appendChild(blockQuantity)
        block.appendChild(this.getPlusBtn())
        block.appendChild(blockSum)

        return block;
    }
}
//список
class List {
    items = []

    constructor(items = []) {
        this.items = items
    }

    findProduct(product) {
        return this.items.filter(el => el.name === product.name)[0]

    }

    add(el) {
        const exist = this.findProduct(el)
        if (exist) {
            exist.inc()
        } else {
            this.items.push(el)
        }
        this.renderInfoField()
        this.renderModalCart()
    }

    remove(el) {
        const exist = this.findProduct(el)
        if (exist.quantity > 1) {
            exist.dec()
        } else {
            this.items = this.items.filter(item => el.name !== item.name)
        }
        this.renderInfoField()
        this.renderModalCart()

    }

    renderInfoField() {}
    renderModalCart() {}
}
// Корзина
class Cart extends List {
    constructor() {
        if (Cart._instance) {
            return Cart._instance
        }
        super()
        this.init()
        Cart._instance = this
    }

    init() {
        const block = document.createElement('div')
        block.classList.add('cart')

        const btnCart = document.createElement('button')
        btnCart.classList.add('btn__cart')
        btnCart.innerText = 'Корзина'
        btnCart.addEventListener('click', () => {
            this.toggle()
        })


        const btnClear = document.createElement('button')
        btnClear.classList.add('btn__clear')
        btnClear.innerText = 'очистить'
        btnClear.addEventListener('click', () => {
            this.clearCart()
        })

        const list = document.createElement('div')
        list.classList.add('cart__info')
        list.innerText = 'инфо'

        block.appendChild(list)
        block.appendChild(btnCart)
        block.appendChild(btnClear)

        const placeToRender = document.querySelector('header')
        if (placeToRender) {
            placeToRender.appendChild(block)
        }

        this.renderInfoField()
        this.renderModalCart()
    }

    getSumCart() {
        const Sum = this.items.reduce((total, el) => {
            return total += el.price * el.quantity
        }, 0)
        const block = document.createElement('div')
        block.classList.add('cart__total')
        block.innerText = `Итого: ${Sum} руб.`

        return block
    }
    getSumFunction() {
        let sum = this.items.reduce((total, el) => {
            return total += el.price * el.quantity
        }, 0)
        return sum
    }
    getQuantity() {
        let count = 0
        this.items.forEach((el) => {
            count += el.quantity
        })
        return count
    }
    toggle() {
        const btnCart = document.querySelector('.btn__cart')
        const modalCart = document.querySelector('.modal__cart')
        modalCart.classList.toggle('show')
        if (modalCart.classList.contains('show') === true) {
            btnCart.innerText = 'закрыть'
        } else {
            btnCart.innerText = 'корзина'
        }
    }

    getEmtyCart() {
        const block = document.createElement('div')
        block.classList.add('cart__emty')
        block.innerText = 'корзина пуста'
        return block
    }
    getCartHeaderTemplate() {
        const block = document.createElement('div')
        block.classList.add('cart__card__header')

        const blockImg = document.createElement('p')
        blockImg.innerText = 'картинка'

        const blockName = document.createElement('p')
        blockName.innerText = `название`

        const blockPrice = document.createElement('p')
        blockPrice.innerText = `цена`

        const blockQuantity = document.createElement('p')
        blockQuantity.innerText = `количество`

        const blockSum = document.createElement('p')
        blockSum.innerText = `сумма`

        block.appendChild(blockImg)
        block.appendChild(blockName)
        block.appendChild(blockPrice)
        block.appendChild(blockQuantity)
        block.appendChild(blockSum)

        return block
    }

    renderInfoField() {
        const placeToRender = document.querySelector('.cart__info')
        placeToRender.innerHTML = ''
        if (!this.items.length) {
            placeToRender.appendChild(this.getEmtyCart())
        } else {
            placeToRender.appendChild(this.getCartInfo())
        }
    }
    renderModalCart() {
        const placeToRender = document.querySelector('.modal__cart')
        placeToRender.innerHTML = ''
        if (!this.items.length) {
            placeToRender.appendChild(this.getEmtyCart())
        } else {
            placeToRender.appendChild(this.getCartHeaderTemplate())
            this.items.forEach(purchases => {
                placeToRender.appendChild(purchases.getCartTemplate())
            })
            placeToRender.appendChild(this.getSumCart())
        }
    }
    getCartInfo() {
        const parent = document.createElement('div')
        parent.classList.add('cart__info__wrap')

        const block1 = document.createElement('p')
        block1.classList.add('cart__count')
        block1.innerText = `Товаров: ${this.getQuantity()} шт.`

        const block2 = document.createElement('p')
        block2.classList.add('cart__total')
        block2.innerText = `На сумму: ${this.getSumFunction()} руб.`

        parent.appendChild(block1)
        parent.appendChild(block2)

        return parent
    }

    clearCart() {
        this.items.forEach((el) => {
            el.quantity = 1
        })
        this.items = []
        this.renderInfoField()
        this.renderModalCart()
    }
}

//Список товаров
class ProductsList extends List {
    constructor() {
        super()
    }
    render() {
        const placeToRender = document.querySelector('.products')
        placeToRender.innerHTML = ''
        if (placeToRender) {
            this.items.forEach(product => {
                const block = product.getMainTemplate()
                block.classList.add('product__wrap')
                placeToRender.appendChild(block)
                
            })
        }
    }
}

const arrProductList = new ProductsList()
arrProductList.add(new Products(0, 'Яблоки', 20, 'apple', 3, 0))
arrProductList.add(new Products(1, 'Бананы', 10, 'banana', 3, 0))
arrProductList.add(new Products(2, 'Тыква', 50, 'pumpkin', 2, 0))
arrProductList.add(new Products(3, 'Кабачки', 15, 'squash', 2, 0))

arrProductList.render()

const userCart = new Cart()
