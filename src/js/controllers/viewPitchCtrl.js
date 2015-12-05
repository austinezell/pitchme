import app from "../app.js";

app.controller('viewPitchCtrl', ["$scope", 'Pitch', "$stateParams", function($scope, Pitch, $stateParams){

  Pitch.getOneById($stateParams.id)
  .success(data => {
    $scope.pitch = data
    $scope.noDevelopers = data.developers.length === 0 ? true : false
  })

  $scope.request = () =>{
    Pitch.request($scope.pitch._id, $scope.pitch.pitcher._id)
  }


}])
