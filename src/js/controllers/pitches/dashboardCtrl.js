import app from "../../app.js";

app.controller("dashboardCtrl", ["$scope", "Pitch", "User", "$state", "$stateParams", "$rootScope", function($scope, Pitch, User, $state, $stateParams, $rootScope){
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

    var tempArr = Array.prototype.reverse.call(pitch.issues);
    $scope.openIssues = tempArr.filter( (issue)=> !issue.isResolved);
    $scope.issues = $scope.openIssues.slice(0, 3);
    $scope.$apply;
    console.log("parent", $scope.openIssues);
  }



}]);


app.controller("issuesCtrl", ["$scope", "$state", "Pitch", function($scope, $state, Pitch){
  $scope.currentLocation.name = $state.current.name.replace("pitches.dashboard.", "");
  $scope.$apply;
  $scope.issue = {};
  let $addIssueDiv;
  angular.element(document).ready(function() {
    $addIssueDiv = $("#addIssueDiv");
    $("#addIssue").on("click", function(event){
      event.stopPropagation();
      $addIssueDiv.toggleClass("revealed");
    })
    $(".content").on("click", function(){
      if($addIssueDiv.hasClass("revealed")) $addIssueDiv.removeClass("revealed");
    })
  });

  $scope.addIssue = (issue) => {
    Pitch.addIssue(issue, $scope.pitch._id)
    .then((response)=>{
      $scope.issue ={}
      $scope.pitch = response.data.pitch;
    }, (err)=>{
      console.log(err)
    })
  }

}])
