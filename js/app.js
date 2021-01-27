/*********************************************/
/************** Carrito De Compras ***********/
/*********************************************/


// Selectores
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Carrito
let cart = [];

// Botones
let buttonsDOM = [];

// Clase creada para para obtener productos con la fetch API al archivo JSON.
// Las clases son "funciones especiales"
// Los methods se crean dentro de las clases
class Products {
    async getProducts() {
        try {
        let result = await fetch('./json/products.json');
        let data = await result.json();
        let products = data.items;

    products = products.map(item => {
        const {title, price} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        return {title, price, id, image};
    });
    return products;
    } catch (error) {
    console.log(error);
    }
    }
}

// Pintar productos en HTML
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
        result += `<article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                Comprar ✋
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
            </article> `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
        let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id);
        if (inCart) {
            button.innerText = 'En el carrito';
            button.disabled = true;
        }
        button.addEventListener('click', (e) => {
            e.target.innerText = 'En el carrito';
            e.target.disabled = true;
            // Obtener producto desde Productos
            let cartItem = {...Storage.getProduct(id), amount: 1};
            console.log(cartItem);
            // Agregar producto al carrito
            cart = [...cart, cartItem];
            // Guardar carrito en el Local Storage
            Storage.saveCart(cart);
            // Seteo de valores del carrito
            this.setCartValues(cart);
            // Mostrar los items del carrito
            this.addCartItem(cartItem);
        });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<img src=${item.image} alt="product">
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>`;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    };
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart)
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    };
    hideCart() {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    };
    cartLogic() {

    // Limpiar carrito
    clearCartBtn.addEventListener('click', () => {
        this.clearCart();
    });

    // Carrito funcionalidad
    cartContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            let removeItem = e.target;
            let id = moveItem.dataset.id;
            cartContent.removeChild(removeItem.parentElement.parentElement);
            this.removeItem(id);
        } else if (e.target.classList.contains('fa-chevron-up')) {
            let addAmount = e.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
            tempItem.amount;
        } else if (e.target.classList.contains('fa-chevron-down')) {
            let lowerAmount = e.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount - 1;
            if (tempItem.amount > 0) {
            Storage.saveCart(cart);
            this.setCartValues(cart);
            lowerAmount.previousElementSibling.innerText = tempItem.amount;
            } else {
            cartContent.removeChild(lowerAmount.parentElement.parentElement);
            this.removeItem(id);
            }
        }
        });
    };
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    };
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `</i>Comprar ✋`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

// Local Storage
// Storage Method. Usando un metodo Static no tengo que llamar la instancia de la clase
class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    // Setup App
    ui.setupAPP();
    // Obtener productos
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
});