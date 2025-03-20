const productos = [
    { id: 1, nombre: "Tenis", precio: 500, imagen: "imagenes/tenis.jpeg" },
    { id: 2, nombre: "Lámpara LED", precio: 300, imagen: "imagenes/luces led.jpg" },
    { id: 3, nombre: "Mochila", precio: 700, imagen: "imagenes/mochila.jpeg" }
];


let carrito = [];
const contenedorProductos = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");

// Mostrar productos
function cargarProductos() {
    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-comprar" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Actualizar icono carrito
function actualizarCarrito() {
    verCarrito.innerText = `🛒 (${carrito.length})`;
}

// Mostrar carrito con detalles
function mostrarCarrito() {
    let carritoHTML = "<h2>Carrito de Compras</h2>";
    carrito.forEach((producto, index) => {
        carritoHTML += `
            <div>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button onclick="eliminarDelCarrito(${index})">❌</button>
            </div>
        `;
    });
    carritoHTML += `<button onclick="cerrarCarrito()">Cerrar</button>`;
    const modal = document.createElement("div");
    modal.id = "modalCarrito";
    modal.innerHTML = carritoHTML;
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.background = "white";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    document.body.appendChild(modal);
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    cerrarCarrito();
    mostrarCarrito();
}

// Cerrar modal del carrito
function cerrarCarrito() {
    const modal = document.getElementById("modalCarrito");
    if (modal) {
        modal.remove();
    }
}

verCarrito.addEventListener("click", mostrarCarrito);

cargarProductos();