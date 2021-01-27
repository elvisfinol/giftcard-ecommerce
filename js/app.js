// ************************************************
// Carrito de compra
// ************************************************

// Declaracion de variables
const carritoBtn = document.querySelector('.carrito-btn');
const cierreCarritoBtn = document.querySelector('.cierre-carrito');
const limpiarCarritoBtn = document.querySelector('limpiar-carrito');
const carritoDOM = document.querySelector('.carrito');
const carritoOverlay = document.querySelector('carrito-overlay');
const carritoItems = document.querySelector('.carrito-items');
const carritoTotal = document.querySelector('.carrito-total');
const carritoContenido = document.querySelector('carrito-contenido');
const productosDOM = document.querySelector('.productos-center');

// Carrito
let carrito = [];
// botones
let botonesDOM = [];

// Clase creada para para obtener productos con la fetch API al archivo JSON.
// Las clases son "funciones especiales"
// Los methods se crean dentro de las clases
class Productos {
    async obtenerProductos(){
        try {
            let resultado = await fetch('./json/products.json')
            let data = await resultado.json();
            
            let productos = data.items;
            productos = productos.map(item => {
                const {title, price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, price, image}
            })
            return productos;
        } catch (error) {
            console.log(error);
        }
    }
}

// Pintar productos en HTML
class UI {
    mostrarProductos(productos) {
    let resultado = '';
    productos.forEach(producto => {
        resultado += `
            <article class="producto">
                <div class="img-container">
                    <img src=${producto.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${producto.id}>
                        <i class="fas fa shopping-cart"></i>
                        Comprar ✋
                    </button>
                </div>
                <h3>${producto.title}</h3>
                <h4>$${producto.price}</h4>
            </article>
        `
    });
    productosDOM.innerHTML = resultado;
    }
    bagBoton(){
        let buttons = [...document.querySelectorAll(".bag-btn")];
        botonesDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let enCarrito = carrito.find(item => item.id === id);

            if(enCarrito) {
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
                    let carritoItems = {...Storage.obtenerProducto(id), amount:1};
                    // Agregar producto al carrito
                    carrito = [...carrito,carritoItems];
                    // Guardar carrito en el local storage
                    Storage.guardarCarrito(carrito);
                    // Setear valores del carrito 
                    this.seteoCarritoValores(carrito);
                    // Mostrar los items del carrito
                    this.agregarCarritoItem(carritoItems);
                    // Mostrar el carrito
                });
            });
        }
        seteoCarritoValores(carrito) {
            let tempTotal = 0;
            let itemsTotal = 0;
            carrito.map(item => {
                tempTotal += item.price * item.amount;
                itemsTotal += item.amount;
            });
            carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
            carritoItems.innerText = itemsTotal;
        }
        agregarCarritoItem(item) {
            const div = document.createElement('div');
            div.classList.add('carrito-items');
            div.innerHTML = `<img src="/images/products/spotify-gift-card.jpg" alt="">
                    <div>
                        <h4>Spotify Card</h4>
                        <h5>$ 10 </h5>
                        <span class="remove-item">remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up"></i>
                        <p class="item-amount">2</p>
                        <i class="fas fa-chevron-down"></i>
                    </div>`
        }
    }


// Local Storage
// Storage Method. Usando un metodo Static no tengo que llamar la instancia de la clase
class Storage {
    static guardarProductos(productos) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    static obtenerProducto(id) {
        let productos = JSON.parse(localStorage.getItem('productos'));
        return productos.find(producto => producto.id === id);
    }
        static guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

// EventListener
// Desde aca llamamos a los metodos
// Nota: no se incluye instancia de Storage class para usar Static Method
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const productos = new Productos();

    // Obtener productos 
    productos.obtenerProductos().then(productos => {
    ui.mostrarProductos(productos);
    Storage.guardarProductos(productos);
    }).then(() => {
        ui.bagBoton();
    });
});