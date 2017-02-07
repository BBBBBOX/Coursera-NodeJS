(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

MsgController.$inject = ['$scope', 'lovesFilter'];
function MsgController($scope, lovesFilter) {
  $scope.stateofBeing = "hungry";

  $scope.sayMessage = function () {
    var msg = "Yaakov likes to eat healty snacks at night!";
    return msg;
  };

  $scope.sayloves = function () {
    var msg = "Yaakov likes to eat healty snacks at night!";
    msg = lovesFilter(msg);
    return msg;
  };

  $scope.feedYaakov = function () {
    $scope.stateofBeing = "fed";
  };
}

function LovesFilter() {
  return function (input) {
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
}

function TruthFilter() {
  return function (input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  }
}
})();
