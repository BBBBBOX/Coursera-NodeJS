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
    controllerAs:'ctrl',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchServiceFactory'];
function NarrowItDownController(MenuSearchServiceFactory) {
 var ctrl = this;
 ctrl.searchTerm = "";
 ctrl.items = [];
 ctrl.results = "";
 var narrowService = MenuSearchServiceFactory();
 ctrl.narrowSearch = function() {
   if (ctrl.searchTerm !== "") {
     var promise  = narrowService.getFilteredItems(ctrl.searchTerm);
     promise.then(function (response) {
       ctrl.items = response;
       if (response.length === 0) {
         ctrl.results = "No items found!";
       }
       else {
         ctrl.results = ctrl.items.length + " items found!";
       }
     })
     .catch(function (error) {
      console.log(error);
    });
  }
  else {
    ctrl.items = [];
    ctrl.results = "Nothing found";
  }
 };

  ctrl.removeItem = function (itemIndex) {
    narrowService.removeItem(itemIndex);
    if (ctrl.items.length === 0) {
      ctrl.results = "";
    }
    else {
      ctrl.results = ctrl.items.length + " items left!";
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
