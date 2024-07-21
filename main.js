let openC = document.getElementById("openc")
let cart = document.querySelector(".cart")
let closeC = document.getElementById("closec")
let content = document.querySelector(".content")
let cartList = document.getElementById("cartList")
let total = document.querySelector(".total-price")
let quantity = document.querySelector(".quantity")
openC.addEventListener("click" , function() {
    cart.classList.add("active")
})
closeC.addEventListener("click" , ()=> {
    cart.classList.remove("active")
})
document.addEventListener("DOMContentLoaded", function () {
    const scrollButton = document.getElementById("scrollButton");
    const targetSection = document.getElementById("target");

    scrollButton.addEventListener("click", function () {
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});
let products = [
    {
        id:1,
        Image: "p1.webp",
        name:"Generic",
        price:299
    },
    {
        id:2,
        Image: "p2.webp",
        name:"ISTANBUL MODEL",
        price:292
    },
    {
        id:3,
        Image:"p3.webp",
        name:"DeFacto",
        price:519
    },    
    {
        id:4,
        Image:"p4.webp",
        name:"Cleocotton",
        price:269
    },
    {
        id:5,
        Image:"p5.webp",
        name:"Jack & Jones",
        price:295
    },
    {
        id:6,
        Image:"p6.webp",
        name:"Sotex",
        price:529
    }
];
let listCards = []
if(localStorage.products != null){
    listCards = JSON.parse(localStorage.products)
}
else {
    listCards = []
}
getLocalStorage()
function initApp(){
    products.forEach( (value)=>{
        let newDiv = document.createElement("div")
        newDiv.classList.add("product-card")
        newDiv.innerHTML = `
        <img src="image/${value.Image}"/>
        <div>
        <h2>${value.name}</h2>
        <span class="h5">${value.price}</span>
        <br>
        <button class="btn btn-primary" onclick="addToCart(${value.id})">To Cart</button>
        </div>
        `
        content.appendChild(newDiv)
    }
)    
}
initApp();
function addToCart(id){
    let product = products.find((pro)=> pro.id === id)
    let productIndex = listCards.findIndex((pro)=> pro.id === id)
    if ( productIndex > -1 ){
        listCards[productIndex].quantity += 1
    }else(
        listCards.push({...product,quantity:1})
    )
    reloadCard();
}
function reloadCard() {
    cartList.innerHTML = ""
    let totalPrice = 0;
    let count = 0
    listCards.forEach( (value)=>{
        totalPrice += value.price * value.quantity
        count += value.quantity
        let newLi = document.createElement("li");
        newLi.classList.add("cart-item");
        newLi.innerHTML = `
        <img src="image/${value.Image}" class="m-2"/>
        <h5>${value.name}</h5>
        <span class="h10">${value.price}</span>
        <div>
        <button class="p-1 btn btn-primary" onclick="changeQuantity(${value.id} , ${value.quantity + 1})">+</button>
        <div class="m-2">${value.quantity}</div>
        <button class="p-1 btn btn-primary" onclick="changeQuantity(${value.id} , ${value.quantity - 1})">-</button>
        </div>
        `
        cartList.appendChild(newLi);
    });
    total.innerHTML = totalPrice
    quantity.innerHTML = count
    localStorage.setItem("products", JSON.stringify(listCards))
}
function changeQuantity(id , newQuantity){
    let productIndex = listCards.findIndex((pro)=> pro.id === id)
    if ( newQuantity === 0 ){
        listCards.splice(productIndex,1)
    }else{
        listCards[productIndex].quantity = newQuantity
    }
    reloadCard();
}
function getLocalStorage(){
    localStorage.getItem("products")
    reloadCard()
}
