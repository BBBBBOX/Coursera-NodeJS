(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http','API_URL'];
function MenuDataService($http,API_URL) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: 'GET',
      url: (API_URL + '/categories.json')
    }).then (function (response) {
      return response.data;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: 'GET',
      url: (API_URL + '/menu_items.json'),
      params: {
        category: categoryShortName
      }
    }).then(function (response) {
      return response.data;
    });
  };


}
})();
