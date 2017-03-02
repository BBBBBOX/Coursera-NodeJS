(function() {
	'use strict';

	angular.module('MenuApp')
	.controller('ItemsController', ItemsController);

  ItemsController.$inject = ['menuData', '$stateParams'] ;
  function ItemsController(menuData, $stateParams) {
		this.menuItems = menuData.menu_items;
		this.category = menuData.category;
  }

  })();
