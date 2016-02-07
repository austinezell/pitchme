import app from "../../app.js";

app.controller('dashboardCtrl', ["$scope", "Pitch", "User", "$state", "$stateParams", function($scope, Pitch, User, $state, $stateParams){
  Pitch.getDetails($stateParams.id)
  .success(data => {
    generateDates(data)
    console.log(data);
  })

  $scope.currentLocation = {};

  let generateDates = (pitch) =>{
    pitch.datePitched = new Date(pitch.datePitched);
    if (pitch.dateCompleted) pitch.dateCompleted = new Date(pitch.dateCompleted);
    $scope.pitch = pitch;
  }


  $scope.issues = [
    {
      title: "Broken Nav-bar",
      datePosted: new Date()
    },
    {
      title: "Broken Login",
      datePosted: new Date()
    },
    {
      title: "Build Profile Page",
      datePosted: new Date()
    }
  ]

}])
