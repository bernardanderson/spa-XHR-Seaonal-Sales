var PriceChanger = (function() {

// Private variable to store the product and categories objects
  var privateProductObject;
  var privateCategoriesObject;

// Return the public interface that other code can interact with
  return {

// Variable to hold parsed json Product Object
    storeProductObject: function(sentProductObject) {
      privateProductObject = sentProductObject;
    },

// Variable to return the parsed json Product Object
    getProductObject: function() {
      return privateProductObject;
    },

// Variable to hold parsed json Categories Object
    storeCategoriesObject: function(sentCategoriesObject) {
      privateCategoriesObject = sentCategoriesObject;
    },

// Variable to return the parsed json Categories Object
    getCategoriesObject: function() {
      return privateCategoriesObject;
    },

// This will modify the prices of the Products and return them to the DOM.
    discountedProductPrices: function(season) {

      var discount = 0;
      var discountID = 0;

// **Mega-Note: this JSON.parse(JSON.stringify()) is needed to "clone" a JSON containing object, it won't work on 
//              functions in a JSON file though.  Without the stringify part, you are just creating a link between
//              the two object so that changing one changes the other).
      var tempDiscountObject = JSON.parse(JSON.stringify(privateProductObject));


// This cycles through the categories object and dermines which season was selected and what product ID is affected
//  by the discount.
      for (var i = 0; i < privateCategoriesObject.categories.length; i++) {
        if (season === privateCategoriesObject.categories[i].season_discount) {
          discount = privateCategoriesObject.categories[i].discount;
          discountID = privateCategoriesObject.categories[i].id;
        };
      };

// This cycles through all the products and if it finds the correct discount ID, it changes the price to the new,
//  discounted price.
      for (var i = 0; i < tempDiscountObject.products.length; i++){
        if (discountID === tempDiscountObject.products[i].category_id) {
          var currentPrice = tempDiscountObject.products[i].price;
          tempDiscountObject.products[i].price = (currentPrice - (currentPrice * discount)).toFixed(2);
        };
      };

// This updates the DOM with the new prices after every select box change.
      printProductsToDOM(tempDiscountObject);
    }
  };

})(PriceChanger  || {});