(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService );

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.buylist = ShoppingListCheckOffService.getBuyList();

  toBuy.itemName = "";
  toBuy.itemQuantity = "";

  toBuy.addItem = function () {
    ShoppingListCheckOffService.addToBuy(toBuy.itemName, toBuy.itemQuantity);
  };

  toBuy.buy = function (itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  };

  toBuy.isEmpty = function () {
    return toBuy.buylist.length === 0;
  };
}




AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought= this;

  bought.boughtlist = ShoppingListCheckOffService.getBought();

  bought.isEmpty = function () {
    return bought.boughtlist.length === 0;
  };


}



function ShoppingListCheckOffService() {
  var shopping = this;

  var buylist = [
    {name: "cookies", quantity: "10"},
    {name: "milk", quantity: "2"},
    {name: "bread", quantity: "5"},
    {name: "surgary drink", quantity: "10"},
    {name: "chocolate", quantity: "10"}
  ];

  var boughtlist = [];

  shopping.addToBuy = function(itemName, quantity){
    var item = {
      name: itemName,
      quantity: quantity
    };
    buylist.push(item);
  };

  shopping.getBuyList = function () {
    return buylist;
  };

  shopping.getBought = function () {
    return boughtlist;
  };

  shopping.buy = function (index) {
    var v = buylist[index];
    console.log(v);
    boughtlist.push(v);
    buylist.splice(index, 1);
  };

}

})();
