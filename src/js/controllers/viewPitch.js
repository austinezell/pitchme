import app from "../app.js";

app.controller('viewPitchCtrl', ["$scope", 'Pitch', "$stateParams", function($scope, Pitch, $stateParams){

  $scope.pitch = Pitch.getOne($stateParams.pitchId)

}])
