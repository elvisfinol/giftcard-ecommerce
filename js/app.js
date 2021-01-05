// ************************************************
// Carrito de compra
// ************************************************

// Declaracion de variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('cart-content');
const productsDOM = document.querySelector('.products-center');

// Carrito
let cart = [];
// botones
let buttonsDOM = []

// Clase para obtener productos
// Las clases son "funciones especiales"
// Los methods se crean dentro de las clases 
class Products {
    //Method
    async getProducts() {
        try {
            let result = await fetch('./json/products.json')
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, price, id, image}
            } )
            return products
        } catch (error) {
            console.log(error);
        }
    }
}

// Clase para mostrar producto desde "Products" o Local Storage
// Desafio Clase 8 - Interacción con el DOM
class UI {
    displayProducts(products) {
    let result = '';
    products.forEach(product => {
        result += `
        <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa shopping-cart"></i>
                        Agregar al carrito
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
        <!--end single product-->
        `
    });
    productsDOM.innerHTML = result;
    }
    getBagButtons(){
        let buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);

            if(inCart) {
                button.innerText = "En el carrito";
                button.disabled = true;
            }
            // Desafio Clase 9 - Incorporar eventos
                button.addEventListener('click', (event) => {
                    // Deshabilitar boton
                    event.target.innerText = "En el carrito";
                    event.target.disabled = true;
                    // Metodos a crear
                    // Obtener producto desde Productos
                    let cartItem = {...Storage.getProduct(id), amount:1};
                    // Agregar producto al carrito
                    cart = [...cart,cartItem];
                    // Guardar carrito en el local storage
                    Storage.saveCart(cart);
                    // Setear valores del carrito 
                    this.setCartValues(cart);
                    // Mostrar los items del carrito
                    // Mostrar el carrito
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
            console.log(cartTotal, cartItems);
        }
    }

// Clase de Storage Local
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Eventos - Desde aca traemos los objetos
// Espera que cargue solo el HTML, no incluye hojas de estilo
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

// Obteniendo todos los productos 
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
})

