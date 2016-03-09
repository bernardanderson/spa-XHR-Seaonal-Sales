//Assigns the select box to a variable
var selectSeasonBox = document.getElementById("seasons");


//Adds object elements to the DOM in individual divs 
function printProductsToDOM(sentParsedProducts) {

  var mainStaticDiv = document.getElementById("products");
  mainStaticDiv.innerHTML = "";
  
  for (var i = 0; i < sentParsedProducts.products.length; i++) {
    
    currentProduct = sentParsedProducts.products[i];

    var newDiv = document.createElement("div");
    newDiv.id = currentProduct.id;
    newDiv.classList.add("item");
    newDiv.innerHTML = `<p>${currentProduct.name}</p>`;
    newDiv.innerHTML += `<p class="cost">${currentProduct.price}</p>`;
    mainStaticDiv.appendChild(newDiv);
  };

}

// Parses the product json object.  Adds the object to the Protected variable in PriceChanger.js
//  Calls the function to build the DOM
function parseProducts() {
  PriceChanger.storeProductObject(JSON.parse(this.responseText));
  printProductsToDOM(PriceChanger.getProductObject());
}

// Parses the categories json object.  Adds the object to the Protected variable in PriceChanger.js
//  Calls the function to build the DOM
function parseCategories() {
  PriceChanger.storeCategoriesObject(JSON.parse(this.responseText));
}

//Tells you if an error happens
function anError(xhrFailureEvent) {
  console.log("An error occured while transferring the data");
}

// This gets called if the select box is changed and calls the price changing function in PriceChanger.js
//  This also sends the value of the select box option selected.
function modifyProductPrices(sentEvent) {
  PriceChanger.discountedProductPrices(sentEvent.target.value);
}

//Function encloses the XHR for the products
function XHRProducts() {

  //Starts the XHR for the products
  var requestProducts = new XMLHttpRequest();

  // The functions are not called until after the event happens.
  requestProducts.addEventListener("load", parseProducts);
  requestProducts.addEventListener("error", anError);

  //This tells the request to either (GET, POST, PUT, DELETE) the 'thing'
  requestProducts.open("GET", "products.json");

  //Sends the 'opened' XHR
  requestProducts.send();
}

//Function encloses the XHR for the products
function XHRCategories() {

  //Starts the XHR for the products
  var requestCategories = new XMLHttpRequest();

  // The functions are not called until after the event happens.
  requestCategories.addEventListener("load", parseCategories);
  requestCategories.addEventListener("error", anError);

  //This tells the request to either (GET, POST, PUT, DELETE) the 'thing'
  requestCategories.open("GET", "categories.json");

  //Sends the 'opened' XHR
  requestCategories.send();
}


//Event Listener for the season select box
selectSeasonBox.addEventListener("change", modifyProductPrices);

// These call the functions to parse the products and categories json files.
XHRProducts();
XHRCategories();