import app from "../../../../app.js";


app.controller("issuesCtrl", ["$scope", "Issue", function($scope, Issue){
  $scope.currentLocation.name = 'issues';
  $scope.currentLocation.issueId = null;
  $scope.currentLocation.sugId = null;
  $scope.newIssue = {};
  $scope.newSuggestion = {body: "", title: undefined};
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
      $scope.newSuggestion = {body: "", title: undefined};
      $scope.openIssues.unshift(response.data.issue);
    }, (err)=>{
      console.log(err)
    })
  }

  $scope.addSuggestion = (suggestion) =>{
    Issue.addSuggestion(suggestion, $scope.issue._id)
    .then(response =>{
      $scope.issue.suggestions.push(response.data);
      $scope.newSuggestion = {};
    })
  }
}])
