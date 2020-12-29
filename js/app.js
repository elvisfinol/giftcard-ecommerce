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
const cartTotal = document.querySelector('cart-total')
const cartContent = document.querySelector('cart-content');
const productsDOM = document.querySelector('.products-center');

// Carrito
let cart = []

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
}

// Clase de Storage Local
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
}

// Eventos - Desde aca traemos los objetos
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

// Obteniendo todos los productos 
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    })
})


//----------------------------------------------------------------------------------------------------------//


//////////////////////////// DESAFIO 4 //////////////////////////// 


function marcoTemporal() {

    let miNombre = prompt('Escribe tu nombre');
    let marcoTemporal = prompt('En que año naciste?. Ingresa un valor comprendido entre 1930 y 2010');

    if (marcoTemporal >= 1930 && marcoTemporal<= 1948) {
        alert(`${miNombre}: eres de la generacion Silent Generation`);
    }

    else if (marcoTemporal >= 1949 && marcoTemporal <= 1968) {
        alert(`${miNombre}: eres de la generacion Baby Boom`);
    }

    else if (marcoTemporal >= 1969 && marcoTemporal <= 1980) {
        alert(`${miNombre}: eres de la generacion X`);
    }

    else if (marcoTemporal >= 1981 && marcoTemporal <= 1993) {
        alert(`${miNombre}: eres de la generacion Y - Millennials`);
    }

    else if (marcoTemporal >= 1994 && marcoTemporal <= 2010) {
        alert(`${miNombre}: eres de la generacion Z`);

    }
}

//////////////////////////// DESAFIO 5 - Objects //////////////////////////// 

function crearObjetoSpotify(correoSP, nombreSP, contrasenaSP) {
    this.correoSpotify = correoSP;
    this.nombreSpotify = nombreSP;
    this.contrasenaSpotify = contrasenaSP;
    this.mostrarCuenta = function () {
        let mensajeBienvenida = 'Gracias por registrarte a Spotify, ahora podras escuchar toda la musica que quieras: \n' +
                                'Tu correo es: ' + this.correoSpotify +
                                '\nTu nombre es: ' + this.nombreSpotify +
                                '\nTu contraseña quedo como: ' + this.contrasenaSpotify;
                                alert(mensajeBienvenida);
                                } 
}
function crearCuentaSpotify() {
    let correo = prompt('Ingresa de correo electronico');
    let nombre = prompt('Ingresa tu nombre');
    let contrasena = prompt('Ingresa tu contraseña');

    let cuentaSpotify = new crearObjetoSpotify(correo, nombre, contrasena);
    cuentaSpotify.mostrarCuenta();
}


//////////////////////////// DESAFIO 6 - Uso de arrays //////////////////////////// 

function mensaje() {
    let mensajeBienvenida = ['Hola', 'bienvenido', 'a', 'nuestra', 'tienda'];
    console.log(mensajeBienvenida.length); // Muestra 5 objetos

    mensajeBienvenida.pop();

    console.log(mensajeBienvenida.length); // Muestra 4 objetos debido a que estoy ejecutando el method pop()

    mensajeBienvenida.push('tienda');

    console.log(mensajeBienvenida.length); // Muestra 5 objetos nuevamente porque agregue "tienda" con el method push()

    mensajeBienvenida.push('de', 'tarjetas', 'de', 'regalo');

    mensajeBienvenida[1] = 'bienvenid@s'; // Cambio el valor de "Bienvenido" por "Bienvenid@s"

    console.log(mensajeBienvenida); // Output del array 

    console.log(mensajeBienvenida.join()) // Output del array en formato string
}
