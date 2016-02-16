import app from "../../../app.js";

app.controller("dashboardCtrl", ["$scope", "Pitch", "User", "$state", "$stateParams", "$rootScope", function($scope, Pitch, User, $state, $stateParams, $rootScope){
  Pitch.getDetails($stateParams.id)
  .success(data => {
    generateDates(data);
  });
  $scope.pitch = {};
  $scope.currentLocation = {};
  $scope.openIssues = [];

  let generateDates = (pitch) =>{
    pitch.datePitched = new Date(pitch.datePitched);
    if (pitch.dateCompleted) pitch.dateCompleted = new Date(pitch.dateCompleted);
    $scope.pitch = pitch;
    pitch.administrators.forEach(admin => {
      if (admin._id === $rootScope.currentUser._id) $scope.isAdmin = true;
    });

    var tempArr = Array.prototype.reverse.call(pitch.issues);
    $scope.openIssues = tempArr.filter( (issue)=> !issue.isResolved);
    $scope.issues = $scope.openIssues.slice(0, 3);
    $scope.$apply;
  }



}]);
