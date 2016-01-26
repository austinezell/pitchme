import app from "../../app.js";

app.controller('dashboardCtrl', ["$scope", "Pitch", "User", "$stateParams", function($scope, Pitch, User, $stateParams){
  Pitch.getDetails($stateParams.id)
  .success(data => {
    $scope.pitch = data
    console.log($scope.pitch);
  })


}])
