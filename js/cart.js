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

<button onclick="removeItem(${item.id})" class="text-red-600">
Delete
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


