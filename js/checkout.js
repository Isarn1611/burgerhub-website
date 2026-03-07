document.addEventListener("DOMContentLoaded", () => {

renderCart()
updateCartBadge()
updateSummary()

initPayment()
initConfirm()

})


/* ---------------- PAYMENT ---------------- */

function initPayment(){

const radios = document.querySelectorAll('input[name="payment"]')

radios.forEach(radio => {
radio.addEventListener("change", () => changePayment(radio.value))
})

}

function changePayment(method){

const box = document.getElementById("payment-info")

if(method === "Promptpay"){
box.innerHTML = `
<div class="text-center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yVPMpUmn2dDPz8jzd2wDYTX3K-UN6lJ5Rw&s" class="w-32 mx-auto mb-3">
<p>Scan QR to pay</p>
</div>`
}

if(method === "Mobile Banking"){
box.innerHTML = `
<p>Transfer to Bank Account</p>
<p class="font-semibold">Bangkok Bank</p>
<p>123-456-7890</p>`
}

if(method === "Credit Card"){
box.innerHTML = `
<p>Enter card information at next step</p>`
}

if(method === "Cash"){
box.innerHTML = `
<p>Pay with cash at counter</p>`
}

}


/* ---------------- SUMMARY ---------------- */

function updateSummary(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

let subtotal = 0

cart.forEach(item=>{
subtotal += item.price * item.qty
})

const vat = subtotal * 0.07
const total = subtotal + vat

document.getElementById("subtotal").innerText = subtotal.toFixed(2)
document.getElementById("vat").innerText = vat.toFixed(2)
document.getElementById("total").innerText = total.toFixed(2)

}


/* ---------------- CONFIRM ---------------- */

function initConfirm(){

const btn = document.getElementById("confirm-btn")

btn.addEventListener("click", () => {

const payment = document.querySelector('input[name="payment"]:checked')

if(!payment){
alert("Please select payment method")
return
}

confirmOrder()

})

}

function confirmOrder(){

const cart = JSON.parse(localStorage.getItem("cart")) || []

const payment = document.querySelector('input[name="payment"]:checked')

if(!payment){
alert("Please select payment method")
return
}

/* save order */
localStorage.setItem("lastOrder", JSON.stringify(cart))

/* save payment */
localStorage.setItem("payment", payment.value)

/* clear cart */
localStorage.removeItem("cart")

/* go to bill */
window.location.href = "bill.html"

}