import app from "../../app.js";

app.controller('addPitchCtrl', ["$scope", "Pitch", function($scope, Pitch) {
  console.log('add pitch controller loaded');
  $scope.createPitch = (pitch) => {
    Pitch.createPitch(pitch)
  }



}])
