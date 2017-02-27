(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.factory('MenuSearchServiceFactory',MenuSearchServiceFactory)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com');

function FoundItemsDirective() {
  var ddo = {
    templateUrl : 'itemsloaderindicator.template.html',
    scope: {
      items: '<',
      onRemove: '&',
      results: '@'
    },
    controller: NarrowItDownController,
    controllerAs:'fi',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchServiceFactory'];
function NarrowItDownController(MenuSearchServiceFactory) {
 var ni = this;
 ni.searchTerm = "";
 ni.items = [];
 ni.results = "";
 var narrowService = MenuSearchServiceFactory();
 ni.narrowSearch = function() {
   if (ni.searchTerm !== "") {
     var promise  = narrowService.getFilteredItems(ni.searchTerm);
     promise.then(function (response) {
       ni.items = response;
       if (response.length === 0) {
         ni.results = "No items found!";
       }
       else {
         ni.results = ni.items.length + " items found!";
       }
     })
     .catch(function (error) {
      console.log(error);
    });
  }
  else {
    ni.items = [];
    ni.results = "Nothing found";
  }
 };

  ni.removeItem = function (itemIndex) {
    narrowService.removeItem(itemIndex);
    if (ni.items.length === 0) {
      ni.results = "";
    }
    else {
      ni.results = ni.items.length + " items left!";
    }
  };
}


function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getFilteredItems = function(searchTerm) {
    var loadingElem = angular.element.find("div.loader");
    loadingElem[0].style.display = "block";
    var response = $http({
      method:'GET',
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){
      foundItems = [];
      for (var i=0; i < result.data.menu_items.length; i++) {
        if (result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(result.data.menu_items[i]);
        }
      }
      loadingElem[0].style.display = "none";
      return foundItems;
    });

    return response;
  }

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}
MenuSearchServiceFactory.$inject = ['$http','ApiBasePath']
function MenuSearchServiceFactory($http, ApiBasePath) {
  var factory = function() {
    return new MenuSearchService($http, ApiBasePath);
  };

  return factory;
}

})();
