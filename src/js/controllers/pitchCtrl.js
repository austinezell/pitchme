import app from "../app.js";

app.controller('addPitchCtrl', ["$scope", "Pitch", function($scope, Pitch) {
  $scope.createPitch = (pitch) => {
    pitch.technologiesDesired = pitch.technologiesDesired.split(/\W+/)
    Pitch.createPitch(pitch)
  }

}])
