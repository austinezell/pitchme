import app from "../../../../app.js";


app.controller("singleIssueCtrl", ["$scope", "$stateParams", "Issue", function($scope, $stateParams, Issue){
  $scope.currentLocation.name = "issues";
  $scope.currentLocation.issueId = $stateParams.issueId;
  $scope.$apply;

  Issue.getIssue($stateParams.issueId)
  .then(response=>{
    $scope.$parent.issue = response.data;
    $scope.$parent.issue.datePosted = new Date(response.data.datePosted);
    $scope.$apply;
  }, (err)=> {
    console.log(err)
  })
}])
