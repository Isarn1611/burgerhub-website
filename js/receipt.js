document.addEventListener("DOMContentLoaded", () => {

const cart = JSON.parse(localStorage.getItem("lastOrder")) || []
const payment = localStorage.getItem("payment") || "Unknown"

const container = document.getElementById("receipt-items")
document.getElementById("payment-method").innerText = payment

const orderId = generateOrderId()
document.getElementById("order-id").innerText = orderId

let subtotal = 0

cart.forEach(item => {

const price = item.price * item.qty
subtotal += price

container.innerHTML += `
<div class="grid grid-cols-[1fr_40px_80px] items-center text-sm">

<span>${item.name}</span>

<span class="text-center">${item.qty}</span>

<span class="text-right">$ ${price.toFixed(2)}</span>

</div>
`

})

const vat = subtotal * 0.07
const total = subtotal + vat

document.getElementById("subtotal").innerText = subtotal.toFixed(2)
document.getElementById("vat").innerText = vat.toFixed(2)
document.getElementById("total").innerText = total.toFixed(2)

})

function generateOrderId(){
return Math.floor(100 + Math.random() * 900)
}