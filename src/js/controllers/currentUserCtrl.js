import app from "../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;
  if (!$rootScope.currentUser) {
    User.getCurrentUserInfo()
    .then((res)=>{
      $scope.profileUser = res.data;
      $scope.dateJoined = new Date($scope.profileUser.dateJoined);
    })
  }
  else {
    $scope.profileUser = $rootScope.currentUser;
    $scope.dateJoined = new Date($scope.profileUser.dateJoined);
  }

}])
