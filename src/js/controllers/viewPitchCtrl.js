import app from "../app.js";

app.controller('viewPitchCtrl', ["$scope", 'Pitch', "$stateParams", "$rootScope", function($scope, Pitch, $stateParams, $rootScope){

  Pitch.getOneById($stateParams.id)
  .success(data => {
    $scope.pitch = data
    $scope.noDevelopers = data.developers.length === 0 ? true : false
    $scope.requested = $scope.pitch.requestedUsers.indexOf($rootScope.currentUser._id) === -1 ? false : true;
  })


  $scope.addComment = (comment) => {
    console.log($scope.pitch);
    Pitch.addComment(comment, $scope.pitch)
  }

  $scope.request = () =>{
    Pitch.request($scope.pitch._id, $scope.pitch.pitcher._id)
    .then(res =>{
      $scope.requested = true;
      swal({
        type: "success",
        text: "You successfully requested to be added to the project"
      })
    })
    .catch(err =>{
      swal({
        title: "Error",
        type: "error",
        text: err,
        timer: 3000
      })
    })
  }


}])
