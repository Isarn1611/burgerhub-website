function createCard(product){

return `
<div class="bg-white rounded-3xl shadow-md p-6 w-[300px] text-center hover:shadow-xl transition">

    <!-- IMAGE -->
    <div class="flex justify-center mb-4">
        <img src="${product.image}" 
        class="w-44 h-44 object-contain">
    </div>

    <!-- NAME -->
    <h3 class="text-lg font-semibold text-gray-800">
        ${product.name}
    </h3>

    <!-- PRICE -->
    <p class="text-gray-700 text-lg mt-2 font-medium">
        $ ${product.price}
    </p>

    <!-- CONTROLS -->
    <div class="flex items-center justify-between mt-5">

        <!-- QUANTITY -->
        <div class="flex items-center bg-gray-100 rounded-full h-10 px-3 gap-2">

            <button 
            onclick="decreaseQty(${product.id})"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                -
            </button>

            <span id="qty-${product.id}" 
            class="w-8 text-center font-medium">
                1
            </span>

            <button 
            onclick="increaseQty(${product.id})"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                +
            </button>

        </div>

        <!-- ADD BUTTON -->
        <button onclick="addToCart(${product.id}, this)"
        class="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition active:scale-90">

        <svg xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">

        <path stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4
        M7 13L5.4 5M7 13l-2 4h12"/>

        </svg>

        Add
        </button>

    </div>

</div>
`
}


const quantities = {}

function increaseQty(id){

if(!quantities[id]) quantities[id] = 1

quantities[id]++

document.getElementById(`qty-${id}`).innerText = quantities[id]

}

function decreaseQty(id){

if(!quantities[id]) quantities[id] = 1

if(quantities[id] > 1){
    quantities[id]--
}

document.getElementById(`qty-${id}`).innerText = quantities[id]

}

function addToCart(id){

const product = products.find(p => p.id === id)

const qty = quantities[id] || 1

let cart = JSON.parse(localStorage.getItem("cart")) || []

const existing = cart.find(item => item.id === id)

if(existing){
    existing.qty += qty
}else{
    cart.push({
        ...product,
        qty: qty
    })
}

localStorage.setItem("cart", JSON.stringify(cart))

updateCartBadge()

}



function updateCartBadge(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

let total = 0

cart.forEach(item=>{
    total += item.qty
})

const badge = document.getElementById("cart-badge")

if(!badge) return

if(total > 0){
    badge.innerText = total
    badge.classList.remove("hidden")
}else{
    badge.classList.add("hidden")
}

}