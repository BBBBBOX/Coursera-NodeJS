(function () {
  'use strict'

angular.module('LunchCheck', [])

.controller('LunchCheckController', lunchC);

lunchC.$inject = ['$scope'];
function lunchC($scope) {
  $scope.list = "";
  $scope.message = "";

  $scope.listChecker = function () {
    var checkempty = $scope.list.split(' ').length;
    var lenthofList = $scope.list.split(',').length;

    if (checkempty == 1 && $scope.list == "") {
      $scope.message = "Please enter data first";
      //$scope.message= {color:'red'};
    } else if (lenthofList <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  };
}

})();
