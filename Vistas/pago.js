$(document).ready(function () {
    let flowers = [];
    let selectedBag = '';
  
    const updateFlowerList = () => {
      const flowerList = $('#flower-list');
      const totalPriceElement = $('#total-price');
      flowerList.empty();
      let totalPrice = 0;
      flowers.forEach((flower, index) => {
        const flowerItem = $(`
          <li>
            <img src="../images/armaturacimo/Flores/${flower.name}.png" alt="${flower.name}">
            <span>${flower.name} - $${flower.price}</span>
            <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
          </li>
        `);
        flowerList.append(flowerItem);
        totalPrice += flower.price;
      });
      totalPriceElement.text(totalPrice);
      $('.bag-display .flower').remove();
      flowers.forEach((flower, index) => {
        let angle = 90 - (180 / (flowers.length + 1)) * (index + 1);
        let flowerElement = $(`<img class="flower" src="../images/armaturacimo/Flores/${flower.name}.png" alt="${flower.name}">`);
        flowerElement.css('transform', `rotate(${angle}deg)`);
        $('.bag-display').append(flowerElement);
      });
    };
  
    $('.selection-buttons button').click(function () {
      selectedBag = $(this).data('bag');
      $('.bag-display .bag').hide();
      $('#' + selectedBag).show();
    });
  
    $('.flower-selection-buttons button').click(function () {
      if (flowers.length >= 12) {
        alert('Has alcanzado el máximo de 12 flores.');
        return;
      }
      var selectedFlower = $(this).data('flower');
      var price = $(this).data('price');
      flowers.push({ name: selectedFlower, price: price });
      updateFlowerList();
    });
  
    $('#flower-list').on('click', '.btn-danger', function () {
      const index = $(this).data('index');
      flowers.splice(index, 1);
      updateFlowerList();
    });
  
    $('#add-to-cart').click(function () {
      if (!selectedBag) {
        alert('Por favor selecciona una bolsa.');
        return;
      }
      if (flowers.length === 0) {
        alert('Por favor selecciona al menos una flor.');
        return;
      }
      let totalPrice = flowers.reduce((sum, flower) => sum + flower.price, 0);
      agregarAlCarrito('Racimo de Flores', `Un hermoso racimo de ${flowers.length} flores`, `../images/armaturacimo/bolsas/${selectedBag}.png`, totalPrice);
      alert('Racimo añadido al carrito');
      flowers = [];
      updateFlowerList();
    });
  
    const btnCart = document.querySelector('.container-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const cartCount = document.getElementById('cart-count');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    function agregarAlCarrito(titulo, descripcion, imagen, precio) {
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
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
    }
  
    function eliminarDelCarrito(indice) {
      carrito.splice(indice, 1);
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
    }
  
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
  
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
      }
    });
  });
  