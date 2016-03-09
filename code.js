//Adds the parsed json objects to the DOM in individual divs 
function printProductsToDOM(sentParsedProducts) {

  var mainStaticDiv = document.getElementById("products");

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

// The parsed json becomes a js object.  Calls the function to build the DOM
function parseProducts() {
  var data = JSON.parse(this.responseText);
  printProductsToDOM(data);
}

//Tells you if an error happens
function anError(xhrFailureEvent) {
  console.log("An error occured while transferring the data");
}

//Starts the XHR
var requestProducts = new XMLHttpRequest();

// The functions are not called until after the event happens.
requestProducts.addEventListener("load", parseProducts);
requestProducts.addEventListener("error", anError);

//This tells the request to either (GET, POST, PUT, DELETE) the 'thing'
requestProducts.open("GET", "products.json");

//Sends the 'opened' XHR
requestProducts.send();