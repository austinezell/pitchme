import app from "../../app.js";

app.controller('addPitchCtrl', ["$scope", "Pitch", function($scope, Pitch) {
  $scope.pitch = {};
  $scope.createPitch = (pitch) => {
    Pitch.createPitch(pitch).then(()=>{
      $scope.pitch = {};
    })
  }
}])
