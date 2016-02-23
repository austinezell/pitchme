import app from "../../../../app.js";


app.controller('suggestionCtrl', ["$scope", "$state", function($scope, $state){
  $scope.currentLocation.name = "issues";
  $scope.currentLocation.sugId = $state.params.sugId;
}])
