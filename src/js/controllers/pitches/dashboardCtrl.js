import app from "../../app.js";

app.controller('dashboardCtrl', ["$scope", "Pitch", "User", "$state", "$stateParams", function($scope, Pitch, User, $state, $stateParams){
  Pitch.getDetails($stateParams.id)
  .success(data => {
    formatData(data);
    console.log(data);
  })

  $scope.currentLocation = {};

  let formatData = (pitch) =>{
    pitch.datePitched = new Date(pitch.datePitched);
    if (pitch.dateCompleted) pitch.dateCompleted = new Date(pitch.dateCompleted);
    $scope.pitch = pitch;
    $scope.issues = $scope.pitch.issues.reverse().filter( (issue)=> !issue.isResolved).slice(0, 3);
    $scope.pitch.openIssues = $scope.pitch.issues.filter( (issue)=> !issue.isResolved);
  }



}])
