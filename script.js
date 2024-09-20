
const products = [
   
    //Fuentes de Poder
    { id: 1, name: "Fuente de poder para PC GameMax VP Series", type: "psu", price: 219.99, description: "Voltaje: 100V/240V. Potencia de salida de 600W. Sistema de cableado fijo. Luz led de colores incluida. Fuente de tipo ATX." },
    { id: 2, name: "Fuente De Poder 850w 80 Plus Gold Gigabyte Full Modular Color Negro", type: "psu", price: 547.90, description: "Lo que tienes que saber de este producto. Potencia de salida de 850W. Sistema de cableado modular para mayor flexibilidad. Fuente de tipo ATX. Con certificación de eficiencia 80 Plus Gold. Diámetro del ventilador de 120mm. Refrigeración por aire." },
    { id: 3, name: "Corsair fuente de poder 750w Sf750 80 plus platinum", type: "psu", price: 789.21, description: "Voltaje: 100V/240V. Potencia de salida de 750W. Sistema de cableado modular para mayor flexibilidad. Fuente de tipo SFX. Con certificación de eficiencia 80 Plus Platinum." },
    { id: 4, name: "Fuente De Poder Msi Mpg A850g Pcie5 850w 80+ Gold Atx Color Negro", type: "psu", price: 660.29, description: "Lo que tienes que saber de este producto. Voltaje: 100V/240V. Potencia de salida de 850W. Fuente de tipo ATX. Con certificación de eficiencia 80 Plus Gold. Diámetro del ventilador de 135mm" },
    { id: 5, name: "XPG Core Reactor 750 fuente de poder 750w 80 plus gold", type: "psu", price: 179.99, description: "Voltaje: 100V/240V. Potencia de salida de 750W. Sistema de cableado modular para mayor flexibilidad. Fuente de tipo ATX. Con certificación de eficiencia 80 Plus Gold" },
    
    //UPS
    { id: 6, name: "UPS inteligente", type: "ups", price: 329.00, description: "CDP R-Smart751I, 10 tomas de salida, 750VA / 375 W, autonomía 35 min, blanco." },
    { id: 7, name: "UPS Forza 1000VA", type: "ups", price: 89.99, description: "Número de salidas: 6 Tipo de enchufe: 1 NEMA 5-15P Capacidad de alimentación (VA): 1000 VA Color: Negro Fuente de alimentación: 220V" },
    { id: 8, name: "Ups Radioshack 1000VA", type: "ups", price: 399.90, description: "Capacidad (VA/W): 480W Número de salidas: 6 Calibraje: Voltaje entrante 220V y voltaje saliente : 220V Capacidad de alimentación (VA): 1000VA Color: Negro." },
    { id: 9, name: "APC Easy UPS BV500I-AR 500VA entrada y salida de 230V", type: "ups", price: 279.27, description: "Voltaje de salida: 230V Voltaje de entrada: 230V Tiene 4 tomas. Apto para computadoras. Peso: 3.9 kg." },
    { id: 10, name: "CDP R2CU-AVR1008I Estabilizador Regulador de voltaje 1000VA 500W 8 Tomas 220V 4 Puertos USB 5V, ARTEUS, Color Negro y blanco", type: "ups", price: 76.23, description: "Voltaje de salida: 220V Voltaje de entrada: 170-270V Potencia pico de 1000VA. Diseño compacto con profundidad de 146 mm." },
];

let cart = [];

function displayProducts(productsToShow) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    productsToShow.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="images/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button onclick="showDetails(${product.id})">Ver detalles</button>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productList.appendChild(productElement);
    });
}

function showDetails(productId) {
    const product = products.find(p => p.id === productId);
    const detailsElement = document.getElementById("productDetails");
    detailsElement.innerHTML = `
        <h2>${product.name}</h2>
        <img src="images/${product.id}.jpg" alt="${product.name}" style="max-width: 100%; height: auto;">
        <p>${product.description}</p>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <p>Tipo: ${product.type === 'psu' ? 'Fuente de Poder' : 'UPS'}</p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
    `;
    openModal('productModal');
}

function filterProducts(type) {
    if (type === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(p => p.type === type);
        displayProducts(filteredProducts);
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    closeModal('productModal');
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = cartCount;
}

function openCartModal() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(2)}`;
    openModal('cartModal');
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartCount();
        openCartModal();
    }
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
}

// Mostrar todos los productos al cargar la página
displayProducts(products);
