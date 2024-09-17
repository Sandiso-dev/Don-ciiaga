import products  from './products.js';

let cartItems = [];

//TYPING EFFECT QUERIES
const div = document.querySelector('.slogan'); 
const text = `Where future meets fashion...`;

//CLOSE AND OPEN CART QUERIES
const cartBtn = document.querySelector('.cartBtn');
const backBtn = document.querySelector('.backBtn');
const productContainer = document.querySelector('.products');
const shipping = document.querySelector('.shipping');
const nav = document.querySelector('.nav');

//LOCALSTORAGE KEY 
const LOCAL_KEY = "mveli211106";

const typingEffect = (element, text, idx = 0) => {
    if (idx === 0) {
        element.textContent = '';
    }

    element.textContent += text[idx];

    // If the function reaches the end of the string
    if (idx === text.length - 1) {
        return;
    }

    setTimeout(() => typingEffect(element, text, idx + 1), 200);
}

typingEffect(div, text);

const welcomingVideo = () => {
    const overlay = document.querySelector('.overLay');
    const landingOverlay = document.querySelector('.landingOverlay');
    const logbg = document.querySelector('.bglog');
    const bod = document.querySelector('#hid');

    // Show the overlay and video when the page loads
    setTimeout(() => {
        overlay.style.display = "block";
        logbg.style.display = "block";
        landingOverlay.style.display = "none"
        productContainer.style.display = "none"
        bod.style.overflow = "hidden";
        nav.style.display = "none";
    }, 500); // Small delay for smooth appearance

    // Hide the overlay and video after 8 seconds
    setTimeout(() => {
        overlay.style.display = "none";
        logbg.style.display = "none";
        landingOverlay.style.display = "block";
        productContainer.style.display = "flex";
        bod.style.overflow = "scroll";
        nav.style.display = "block";
    }, 6000); 
};


//CLOSING AND OPENING CART FUNCTIONS
cartBtn.addEventListener('click', () => {
    shipping.style.display = "grid";
    productContainer.style.display = "none";
    nav.style.display = "none";
});

backBtn.addEventListener('click', () => {
    shipping.style.display = "none";
    productContainer.style.display = "flex";
    nav.style.display = "block";
    console.log("working")
});

//DISPLAY ITEMS DYNAMIC FROM THE DATA - done
//ADD ITEMS TO CART - done
//DISPLAY ITEMS TO CART - done 
//UPDATE CART QUANTITY IN HOME PAGE - done 
//FILTERING FEATURE - done 
//SAVE ITEMS ON CART IF PAGE REFRESHES OR USER LEAVES THE SITE FOR A MOMENT - done 
//DELETE ITEMS FROM CART - done 
//INCREASE OR DECREASE QUANTITY ALONG WITH THE PRICE OF THE PRODUCT - done 
//CALCULATE TOTAL - done 

//USING THIS FUNCTION TO SHUFFLE MY PRODUCTS IN THE HOME PAGE SINCE MY DATA IS SORTED TO RELEVANCE
//BY USING THE SORT METHOD WITH A RANDOM COMPARISON.
const shuffleProducts = (products) => {
    return products.sort(() => Math.random() - 0.5);
};


const renderProducts = () => {
    const landingProductContainer = document.querySelector('.products');
    landingProductContainer.innerHTML = '';

    const shuffledProds = shuffleProducts(products)

  for (const[idx , item] of Object.entries(shuffledProds)){
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    const prodImg = document.createElement('img');
    prodImg.src = item.img

    const prodPrice = document.createElement('p');
    prodPrice.textContent = item.price; 
    
    const prodBtn = document.createElement('button');
    prodBtn.classList = 'addToCart';
    prodBtn.textContent = 'Add To Cart'; 
    prodBtn.onclick = () => addToCartFunc(idx);

    productDiv.appendChild(prodImg)
    productDiv.appendChild(prodPrice);
    productDiv.appendChild(prodBtn);

    landingProductContainer.appendChild(productDiv);
  
    };
};


//RENDER THESE PRODUCTS BASED ON WHAT THE USER CHOOSE USING THE FILTER METHOD ALONG WITH THE CARTEGORY PAIR I CREATED ON MY DATA TO MANIPULATE 
//THE ARRAY ACCORDING TO WHAT THE USER WANTS
const filter = (category) => {
    const filteredProducts = products.filter(product => product.category === category);
    renderFilteredProducts(filteredProducts);  // Show only filtered products
};

const renderFilteredProducts = (filteredProducts) => {
    const landingProductContainer = document.querySelector('.products');
    landingProductContainer.innerHTML = '';  // Clear current products

    for (const item of filteredProducts) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const prodImg = document.createElement('img');
        prodImg.src = item.img;

        const prodPrice = document.createElement('p');
        prodPrice.textContent = item.price;

        const prodBtn = document.createElement('button');
        prodBtn.classList = 'addToCart';
        prodBtn.textContent = 'Add To Cart';

        productDiv.appendChild(prodImg);
        productDiv.appendChild(prodPrice);
        productDiv.appendChild(prodBtn);

        landingProductContainer.appendChild(productDiv);
    }
};


document.querySelectorAll('.options div').forEach(option => {
    option.addEventListener('click', (e) => {
        const selectedCategory = e.target.getAttribute('data-category');
         // Filter products based on the clicked category
        filter(selectedCategory); 
    });
});


//SAVING THE CART ITEMS TO LOCAL STORAGE FOR PERSISTANCE
const saveItem = () => {
    let toStringItems = JSON.stringify(cartItems);
    localStorage.setItem(LOCAL_KEY, toStringItems);
}

//RETRIEVING ITEMS FROM LOCAL STORAGE IF THERE ARE 
const loadItemsCartItems = () => {
    let savedItems = localStorage.getItem(LOCAL_KEY);
    if (savedItems) cartItems = JSON.parse(savedItems);
    renderCartItems();
    displayAmountCart()
};

const addToCartFunc = (idx) => {

    //check if item exists in the cart 
    const existingCartItem = cartItems.find(item => item.id === idx);

    if(existingCartItem){
        existingCartItem.quantity += 1;

    }else{
        //FETCHING PRODUCT DETAILS 
        const product = products[idx];
        cartItems.push({
            id:idx, 
            quantity: 1,
            price: product.price,
            img: product.img
        });
    }

    saveItem();
    renderCartItems();
    displayAmountCart();
}

const renderCartItems = () => {
  
    // Targeting the container for items in the cart to append to
    const itemsContainer = document.querySelector('.itemsContainer');
    itemsContainer.innerHTML = null;

    for (const [idx, item] of Object.entries(cartItems)) {
        // Create the elements which will be appended
        const itemDesc = document.createElement('div');
        itemDesc.className = "itemDescription";

        const prod = document.createElement('div');
        prod.className = "item"; 

        const prodImg = document.createElement('img');
        prodImg.src = item.img;

        const addBtn = document.createElement('button');
        addBtn.className = "add";
        addBtn.textContent = "Add quantity";
        addBtn.onclick = () => addItemQuant(item);

        const minusBtn = document.createElement('button');
        minusBtn.className = "minus";
        minusBtn.textContent = "Minus quantity";
        minusBtn.onclick = () => minusItemQuant(item);

        const text = document.createElement('p');
        text.classList = "quantity";
        text.textContent = `Quantity: ${item.quantity}`;

        const pric = document.createElement('p');
        pric.textContent = `Price: R${item.price * item.quantity}`;

        itemDesc.appendChild(text);
        itemDesc.appendChild(addBtn);
        itemDesc.appendChild(minusBtn);
        itemDesc.appendChild(pric);

        prod.appendChild(prodImg);
        prod.appendChild(itemDesc);

        itemsContainer.appendChild(prod);
    }

    // Update the total every time a new item is added
    calculateTotal();
};


//INCREMENTINT 
const addItemQuant = (item) => {
    const existItem = cartItems.find(prod => prod.id === item.id);
    if (existItem) {
        existItem.quantity++;
        saveItem();
        renderCartItems();
         // Update total whenever quantity changes
        calculateTotal(); 
        displayAmountCart(cartItems);
    }
};


//DECREMENT OR DELETE
const minusItemQuant = (item) => {
    const existItem = cartItems.find(prod => prod.id === item.id);
    if (existItem && existItem.quantity > 1) {
        existItem.quantity--;
        saveItem();
        renderCartItems();
        calculateTotal(); 

    //IF THE PRODUCT DOES EXIST AND THE QUANTITY IS 1 DELETE IT IF IT REACHES ZERO
    } else if (existItem && existItem.quantity === 1) {
        // remove the item if quantity reaches 0
        cartItems = cartItems.filter(prod => prod.id !== item.id);
        saveItem();
        renderCartItems();
        calculateTotal();
        displayAmountCart(cartItems)
    }
};


const calculateTotal = () => {
    const totalContainer = document.querySelector('.totalContainer');
    //FORMULA TO CALCULATE THE TOTAL AMOUNT BY SUMMING UP THE QUANTITY WITH PRICE AND THE LENGTH OF THE ARRAY
    let totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const totalText = document.querySelector('.totalAmount');
    if (!totalText) {
        const newTotalText = document.createElement('p');
        newTotalText.className = "totalAmount";
        totalContainer.appendChild(newTotalText);
    } else {
        totalText.textContent = `Total: R${totalAmount}`;
    }
    
};

//DISPLAYING AMOUNT OF ITEMS IN CART IN HOME PAGE 
const displayAmountCart = () => {
    const quant = document.querySelector('.quantity');

    // Check if cartItems exists and has items
    const totalQuantity = cartItems.length > 0 
        ? cartItems.reduce((total, item) => total + item.quantity, 0) 
        : 0;

    quant.textContent = totalQuantity;

    // Optionally hide the quantity element if it's 0
    if (totalQuantity === 0) {
        quant.style.display = 'none';
    } else {
        quant.style.display = 'inline';  // Make sure it shows when quantity is more than 0
    }
};

document.addEventListener('DOMContentLoaded', () => {
welcomingVideo();
renderProducts();
displayAmountCart();
loadItemsCartItems();
}
);


