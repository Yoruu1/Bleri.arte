const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartCount = document.getElementById('cart-count');
const selectedProductsContainer = document.querySelector('.selected-products-container');
let carrito = [];

// Alternar visibilidad del carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
    selectedProductsContainer.classList.toggle('hidden-cart');
    if (!selectedProductsContainer.classList.contains('hidden-cart')) {
        actualizarProductosSeleccionados();
    }
});

// Función para agregar al carrito
function agregarAlCarrito(titulo, descripcion, imagen, precio) {
    const productoExistente = carrito.find(producto => producto.titulo === titulo);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const producto = {
            titulo,
            descripcion,
            imagen,
            precio,
            cantidad: 1
        };
        carrito.push(producto);
    }
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
    if (!selectedProductsContainer.classList.contains('hidden-cart')) {
        actualizarProductosSeleccionados();
    }
}

// Función para eliminar del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
    
    guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
    if (!selectedProductsContainer.classList.contains('hidden-cart')) {
        actualizarProductosSeleccionados();
    }
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const contenedorProductosCarrito = document.querySelector('.container-cart-products');
    contenedorProductosCarrito.innerHTML = ''; // Limpiar los elementos previos del carrito

    carrito.forEach((producto, indice) => {
        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add('cart-product');
        productoCarrito.innerHTML = `
            <div>
                <h6>${producto.titulo}</h6>
                <p>${producto.descripcion}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio: ${producto.precio} Pesos</p>
                <p>Total: ${producto.precio * producto.cantidad} Pesos</p>
                <button class="btn-remove" onclick="eliminarDelCarrito(${indice})">Eliminar</button>
            </div>
        `;
        contenedorProductosCarrito.appendChild(productoCarrito);
    });

    // Actualizar contador del carrito
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.innerText = totalProductos;
}

// Función para actualizar los productos seleccionados
function actualizarProductosSeleccionados() {
    selectedProductsContainer.innerHTML = ''; // Limpiar los elementos previos de los productos seleccionados

    carrito.forEach(producto => {
        const productoSeleccionado = document.createElement('div');
        productoSeleccionado.classList.add('selected-product');
        productoSeleccionado.innerHTML = `
            <div>
                <h6>${producto.titulo}</h6>
                <p>${producto.descripcion}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio: ${producto.precio} Pesos</p>
                <p>Total: ${producto.precio * producto.cantidad} Pesos</p>
            </div>
        `;
        selectedProductsContainer.appendChild(productoSeleccionado);
    });
}

// Agregar event listeners a los botones "Agregar al carrito"
document.querySelectorAll('.btn_style').forEach((boton, indice) => {
    boton.addEventListener('click', () => {
        const tarjeta = boton.closest('.card');
        const titulo = tarjeta.querySelector('.card-title').innerText;
        const descripcion = tarjeta.querySelector('.card-text').innerText;
        const imagen = tarjeta.querySelector('img').src;
        const precio = parseInt(tarjeta.querySelector('.price').innerText.replace('Valor: ', '').replace(' Pesos', ''));
        agregarAlCarrito(titulo, descripcion, imagen, precio);
    });
});

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar el carrito del almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});
