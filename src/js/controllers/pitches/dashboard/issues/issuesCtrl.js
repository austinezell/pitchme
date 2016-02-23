import app from "../../../../app.js";


app.controller("issuesCtrl", ["$scope", "$state", "Pitch", function($scope, $state, Pitch){
  $scope.currentLocation.name = 'issues'
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
    Pitch.addIssue(issue, $scope.pitch._id)
    .then((response)=>{
      $scope.newIssue ={}
      $scope.openIssues.unshift(response.data.issue);
      $scope.$apply;
    }, (err)=>{
      console.log(err)
    })
  }

  $scope.addSuggestion = (suggestion) =>{
    Pitch.addSuggestion(suggestion, $scope.issue._id)
    .then(response =>{
      $scope.newSuggestion = {};
    })
  }
}])
