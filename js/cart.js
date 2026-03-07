function renderCart(){

const cartContainer = document.getElementById("cart-items")

const cart = JSON.parse(localStorage.getItem("cart")) || []

cartContainer.innerHTML = ""

let total = 0

cart.forEach(item => {

total += item.price * item.qty

cartContainer.innerHTML += `
<div class="flex items-center justify-between bg-white p-4 rounded-xl shadow">

<div class="flex items-center gap-4">

<img src="${item.image}" class="w-16 h-16 object-contain">

<div>
<h3 class="font-semibold">${item.name}</h3>
<p>$${item.price}</p>
</div>

</div>

<div class="flex items-center gap-4">

<button onclick="decreaseItem(${item.id})">-</button>

<span>${item.qty}</span>

<button onclick="increaseItem(${item.id})">+</button>

<button onclick="removeItem(${item.id})"
class="text-red-500 hover:text-red-700 transition">

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>

</button>

</div>

</div>
`
})

document.getElementById("cart-total").innerText = total.toFixed(2)

}


function increaseItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || []

const item = cart.find(p => p.id === id)

if(item){
item.qty++
}

localStorage.setItem("cart", JSON.stringify(cart))

renderCart()
updateSummary()
updateCartBadge()

}


function decreaseItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || []

const item = cart.find(p => p.id === id)

if(item && item.qty > 1){
item.qty--
}

localStorage.setItem("cart", JSON.stringify(cart))

renderCart()
updateSummary()
updateCartBadge()

}


function removeItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart = cart.filter(item => item.id !== id)

localStorage.setItem("cart", JSON.stringify(cart))

renderCart()
updateSummary()
updateCartBadge()

}


function updateCartBadge(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

let total = 0

cart.forEach(item => {
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


function confirmOrder(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

if(cart.length === 0){
alert("Cart is empty")
return
}

/* บันทึก order ไว้เผื่อใช้ในหน้า thankyou */
localStorage.setItem("lastOrder", JSON.stringify(cart))

/* ล้างตะกร้า */
localStorage.removeItem("cart")

/* เปลี่ยนหน้า */
window.location.href = "bill.html"

}


