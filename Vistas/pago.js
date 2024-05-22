// main.js

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    // Crear un objeto del producto
    const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1 // Puedes ajustar la lógica para manejar cantidades
    };

    // Recuperar el carrito actual de localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index > -1) {
        carrito[index].cantidad += 1; // Incrementar la cantidad si ya está en el carrito
    } else {
        carrito.push(producto); // Agregar nuevo producto
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('cart-count').innerText = totalProductos;
}

// Inicializar el contador del carrito cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});
