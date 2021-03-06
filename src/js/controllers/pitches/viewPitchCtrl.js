import app from "../../app.js";

app.controller('viewPitchCtrl', ["$scope", 'Pitch', "$stateParams", "$rootScope", function($scope, Pitch, $stateParams, $rootScope){

  Pitch.getOneById($stateParams.id)
  .success(data => {
    $scope.pitch = data
    $scope.noDevelopers = data.developers.length === 0 ? true : false
    if ($rootScope.currentUser){
      $scope.requested = $scope.pitch.requestedUsers.indexOf($rootScope.currentUser._id) === -1 ? false : true;
    }
  })


  $scope.addComment = (comment) => {
    Pitch.addComment(comment, $scope.pitch._id)
    .then(res => {
      $scope.pitch = res.data
      $scope.comment = ""
    })
  }

  $scope.request = () =>{
    Pitch.request($scope.pitch._id, $scope.pitch.pitcher._id)
    .then(res =>{
      $scope.requested = true;
      swal({
        title: "Request Sent!",
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
