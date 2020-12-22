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

//////////////////////////// DESAFIO 5 //////////////////////////// 

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


// ************************************************
// Shopping Cart API
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