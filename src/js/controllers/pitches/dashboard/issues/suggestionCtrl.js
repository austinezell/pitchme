import app from "../../../../app.js";


app.controller('suggestionCtrl', ["$scope", "$state", "Issue", function($scope, $state, Issue){
  $scope.currentLocation.sugId = $state.params.sugId;

  Issue.getSuggestion($state.params.sugId)
  .then(response =>{
    $scope.suggestion = response.data;
    $scope.suggestion.datePosted = new Date(response.data.datePosted)
  }, (err)=>{
    console.log(err);
  })
}])
