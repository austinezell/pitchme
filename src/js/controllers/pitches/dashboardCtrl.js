import app from "../../app.js";

app.controller('dashboardCtrl', ["$scope", "Pitch", "User", "$state", "$stateParams", "$rootScope", function($scope, Pitch, User, $state, $stateParams, $rootScope){
  console.log('dash controller loaded');
  Pitch.getDetails($stateParams.id)
  .success(data => {
    generateDates(data);
    console.log(data);
  })

  $scope.currentLocation = {};

  let generateDates = (pitch) =>{
    pitch.datePitched = new Date(pitch.datePitched);
    if (pitch.dateCompleted) pitch.dateCompleted = new Date(pitch.dateCompleted);
    $scope.pitch = pitch;
    pitch.administrators.forEach(admin => {
      if (admin._id === $rootScope.currentUser._id) $scope.isAdmin = true;
    });
    $scope.issues = $scope.pitch.issues.reverse().filter( (issue)=> !issue.isResolved).slice(0, 3);
    $scope.pitch.openIssues = $scope.pitch.issues.filter( (issue)=> !issue.isResolved);
  }



}]);


app.controller('issuesCtrl', ["$scope", "$state", "Pitch", function($scope, $state, Pitch){
  $scope.currentLocation.name = $state.current.name.replace('pitches.dashboard.', '');
  $scope.$apply;
  $scope.issue = {};
  angular.element(document).ready(function() {
    $("#addIssue").on("click", function(){
      $("#addIssueDiv").toggleClass("revealed");
    })
  });

  $scope.addIssue = (issue) => {
    Pitch.addIssue(issue, $scope.pitch._id)
  }

}])
