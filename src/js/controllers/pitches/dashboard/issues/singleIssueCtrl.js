import app from "../../../../app.js";


app.controller("singleIssueCtrl", ["$scope", "$stateParams", "Pitch", function($scope, $stateParams, Pitch){
  $scope.currentLocation.name = "issues";
  $scope.currentLocation.id = $stateParams.issueID;
  $scope.$apply;
  if (!$scope.issue._id){
    let unbind = $scope.$watch(
      "openIssues",
      function(nVal, oVal){
        nVal.forEach(issue =>{
          if (issue._id === $stateParams.issueID) {
            issue.datePosted = new Date(issue.datePosted);
            $scope.issue = issue;
            unbind();
          }
        })
      })
    }else {
      $scope.issue.datePosted = new Date($scope.issue.datePosted);
    }
  }])
