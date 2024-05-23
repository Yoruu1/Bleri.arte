$(document).ready(function () {
    const btnCart = document.querySelector('.container-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const cartCount = document.getElementById('cart-count');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Function to add product to the cart
    function agregarAlCarrito(titulo, descripcion, imagen, precio) {
      console.log('Producto a agregar:', { titulo, descripcion, imagen, precio });
      const productoExistente = carrito.find(producto => producto.titulo === titulo && producto.descripcion === descripcion);
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
      console.log('Carrito actualizado:', carrito);
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
    }
  
    // Function to remove product from the cart
    function eliminarDelCarrito(indice) {
      carrito.splice(indice, 1);
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
    }
  
    // Function to update the cart display
    function actualizarCarrito() {
      const contenedorProductosCarrito = document.querySelector('.container-cart-products');
      contenedorProductosCarrito.innerHTML = '';
  
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
  
      const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
      cartCount.innerText = totalProductos;
    }
  
    // Function to save the cart to local storage
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  
    // Event listener for the add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach((boton) => {
      boton.addEventListener('click', () => {
        const tarjeta = boton.closest('.card');
        const titulo = tarjeta.querySelector('.card-title').innerText;
        const descripcion = tarjeta.querySelector('.card-text').innerText;
        const imagen = tarjeta.querySelector('img').src;
        const precio = parseInt(tarjeta.querySelector('.price').innerText.replace('Valor: ', '').replace(' Pesos', ''));
        agregarAlCarrito(titulo, descripcion, imagen, precio);
      });
    });
  
    // Load the cart from local storage on page load
    document.addEventListener('DOMContentLoaded', () => {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
      }
    });
  
    // Toggle cart display
    btnCart.addEventListener('click', () => {
      containerCartProducts.classList.toggle('hidden-cart');
    });
  });
  