import app from "../../../../app.js";


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
