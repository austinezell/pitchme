import app from "../../../../app.js";


app.controller("issuesCtrl", ["$scope", "Issue", function($scope, Issue){
  $scope.currentLocation.name = 'issues';
  $scope.currentLocation.issueId = null;
  $scope.$apply;
  $scope.newIssue = {};
  $scope.newSuggestion = {};
  let $addItem;

  angular.element(document).ready(function() {
    $addItem = $(".add-item-div");
    $("#revealIssueForm, #revealSuggestionForm").on("click", function(event){
      event.stopPropagation();
      $(this).closest('.add-item-div').toggleClass("revealed");
    });
    $addItem.on("click", function(event){
      event.stopPropagation();
    })
    $(".content").on("click", function(){
      $addItem.removeClass("revealed");
    })
  });

  $scope.addIssue = (issue) => {
    Issue.addIssue(issue, $scope.pitch._id)
    .then((response)=>{
      $scope.newIssue ={}
      $scope.openIssues.unshift(response.data.issue);
      $scope.$apply;
    }, (err)=>{
      console.log(err)
    })
  }

  $scope.addSuggestion = (suggestion) =>{
    Issue.addSuggestion(suggestion, $scope.issue._id)
    .then(response =>{
      $scope.newSuggestion = {};
    })
  }
}])
