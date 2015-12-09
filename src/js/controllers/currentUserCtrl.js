import app from "../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;
  User.getCurrentUserInfo()
  .then((res)=>{
    $scope.profileUser = res.data;
    $scope.dateJoined = new Date($scope.dateJoined);
  })

}])
