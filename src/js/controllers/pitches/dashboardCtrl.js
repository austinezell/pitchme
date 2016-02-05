import app from "../../app.js";

app.controller('dashboardCtrl', ["$scope", "Pitch", "User", "$stateParams", function($scope, Pitch, User, $stateParams){
  Pitch.getDetails($stateParams.id)
  .success(data => {
    generateDates(data)
    console.log(data);
  })

  let generateDates = (pitch) =>{
    pitch.datePitched = new Date(pitch.datePitched);
    if (pitch.dateCompleted) pitch.dateCompleted = new Date(pitch.dateCompleted);
    $scope.pitch = pitch;
  }

}])
