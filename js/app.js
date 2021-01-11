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
        <!-- single product -->
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
        <!--end single product-->
        `
    });
    productosDOM.innerHTML = resultado;
    }
    obtenerBtnsCarrito() {
        // Utilizacion de Spread Operator
        const botonesCarrito = [...document.querySelectorAll(".bag-btn")];
        console.log(botonesCarrito);
    }
}

// Local Storage
// Storage Method. Usando un metodo Static no tengo que llamar la instancia de la clase
class Storage {
    static guardarProductos(productos) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    static obtenerProducto(id){
        let productos = JSON.parse(localStorage.getItem('productos'));
        return productos.find( producto => producto.id === id);
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
        ui.obtenerBtnsCarrito();
    });
});