import app from "../../app.js";

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


app.controller("issuesCtrl", ["$scope", "$state", "Pitch", function($scope, $state, Pitch){
  $scope.currentLocation.name = $state.current.name.replace("pitches.dashboard.", "");
  $scope.$apply;
  $scope.newIssue = {};
  $scope.issue = {};
  let $addIssueDiv;
  angular.element(document).ready(function() {
    $addIssueDiv = $("#addIssueDiv");
    $("#addIssue").on("click", function(event){
      event.stopPropagation();
      $addIssueDiv.toggleClass("revealed");
    });
    $addIssueDiv.on("click", function(event){
      event.stopPropagation();
    })
    $(".content").on("click", function(){
      if($addIssueDiv.hasClass("revealed")) $addIssueDiv.removeClass("revealed");
    })
  });

  $scope.changeIssue = (issue) => {
    console.log(issue);
    $scope.issue = issue;
  }

  $scope.addIssue = (issue) => {
    Pitch.addIssue(issue, $scope.pitch._id)
    .then((response)=>{
      $scope.newIssue ={}
      $scope.openIssues.unshift(response.data.issue);
      $scope.$apply;
    }, (err)=>{
      console.log(err)
    })
  }

}])

app.controller("singleIssueCtrl", ["$scope", "$stateParams", "Pitch", function($scope, $stateParams, Pitch){
  $scope.currentLocation.name = "issues";
  $scope.currentLocation.id = $stateParams.issueID;
  $scope.$apply;

  if (!$scope.issue._id){
    var unbind = $scope.$watch(
      "openIssues",
      function(nVal, oVal){
        nVal.forEach(issue =>{
          if (issue._id === $stateParams.issueID) {
            $scope.issue = issue;
            unbind();
          }
        })
      })
    }
  }])
