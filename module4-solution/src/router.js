(function () {
'use strict';

angular.module('MenuApp')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url:'/home',
    templateUrl:'src/states/home.state.template.html'
  })

  .state('categories', {
    url:'/categories',
    templateUrl: 'src/states/categories.state.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryID}',
    templateUrl: 'src/states/items.state.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      menuData: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryID);
      }]
    }
  });

  
}]);

})();
