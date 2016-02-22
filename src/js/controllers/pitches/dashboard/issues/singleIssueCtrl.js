import app from "../../../../app.js";


app.controller("singleIssueCtrl", ["$scope", "$stateParams", "Pitch", function($scope, $stateParams, Pitch){
  $scope.currentLocation.name = "issues";
  $scope.currentLocation.id = $stateParams.issueId;
  $scope.$apply;

  Pitch.getIssue($stateParams.issueId)
  .then(response=>{
    $scope.issue = response.data;
  })
}])
