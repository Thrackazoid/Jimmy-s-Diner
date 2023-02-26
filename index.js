import {menuArray} from '/data.js'

const yourOrderArr = []
let itemsHTML = ''
let totalPrice = 0


document.addEventListener('click', e => {
    if(e.target.dataset.item) {
        handleMenuClick(e.target.dataset.item)
        }
    else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.dataset.checkout) {
        handleCheckoutClick()
    }
 
})

document.addEventListener('submit', e => {
    e.preventDefault()
    const formDeets = new FormData(document.getElementById('input--div'))
    const name = formDeets.get('name')
    
    document.getElementById('modal').classList.add('hidden')
    document.getElementById('your-order').innerHTML = `
    <div id='thanks'>Thanks, ${name}! Your order is on its way!</div>
    `
}) 

function handleMenuClick(itemName) {
    if (!yourOrderArr.includes(itemName)){
    yourOrderArr.unshift(itemName)
    adjustPriceUp(itemName)
    updateYourItems()
    }
}

function handleRemoveClick(itemName) {
    if (yourOrderArr.includes(itemName)) {
        const targetIndex = yourOrderArr.indexOf(itemName)
        yourOrderArr.splice(targetIndex, 1)
        adjustPriceDown(itemName)
        updateYourItems()
    }
}

function handleCheckoutClick() {
    document.getElementById('modal').classList.remove('hidden')
}

function handlePayClick() {
    document.getElementById('modal').classList.add('hidden')
}

function getPrice(itemName) {
    let price = ''
    
    menuArray.forEach(menuItem => {
        if(menuItem.name === itemName) {
            price = menuItem.price
        }
    })
 return price
}

function adjustPriceUp(itemName) {
        const price = getPrice(itemName)
        totalPrice += price
        document.getElementById('total-price').textContent = `$${totalPrice}`
    }


function adjustPriceDown(itemName) {
      const price = getPrice(itemName)
      totalPrice -= price
      document.getElementById('total-price').textContent = `$${totalPrice}`
}


function updateYourItems() {
  
        itemsHTML = ''
    
    yourOrderArr.forEach(item => {
      const price = getPrice(item)
        
        itemsHTML += `
        <div class='order-item ${item}'>
        <h3>${item} <span class='remove' data-remove='${item}'>(remove)</span></h3> <p>${price}</p>
        </div>
        `
    
    })
    document.querySelector('.your-items').innerHTML = itemsHTML
}


function getMenuItems() {
    let menuHTML = ''
    
    for (let item of menuArray) {
        
       let ingredients = item.ingredients.toString().replaceAll(',', ', ')
       
        menuHTML += `
        <div class='menu-item ${item.name}'>
            <div class='flex-outer'>
                <div class='flex-info'>
                    <div class='emoji'>${item.emoji}</div>
                    <div class='menu-item-info'>
                        <p class='menu-item-name'>${item.name}</p>
                        <p class='menu-item-ingredients'>${ingredients}</p>
                        <p class='menu-item-price'>$${item.price}</p>
                    </div>
                </div>
                <button class='add-btn' data-item=${item.name}>+</button>
            </div>
        </div>
        `
    }
    document.getElementById('menu').innerHTML = menuHTML
}

getMenuItems()
