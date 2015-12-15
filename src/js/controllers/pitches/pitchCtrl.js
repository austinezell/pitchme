import app from "../../app.js";

app.controller('addPitchCtrl', ["$scope", "Pitch", function($scope, Pitch) {
  $scope.createPitch = (pitch) => {
    Pitch.createPitch(pitch)
  }

  

}])
