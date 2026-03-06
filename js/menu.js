function filterMenu(category){

const grid = document.getElementById("menu-grid")

grid.innerHTML = ""

const filtered = products.filter(p => p.category === category)

filtered.forEach(product=>{
grid.innerHTML += createCard(product)
})

}

function setActive(button){

document.querySelectorAll(".menu-btn")
.forEach(btn => btn.classList.remove("active"))

button.classList.add("active")

}

document.addEventListener("DOMContentLoaded", () => {

filterMenu("combo")

updateCartBadge()

})