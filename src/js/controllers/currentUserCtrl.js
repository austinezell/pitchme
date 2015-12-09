import app from "../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;
  User.getCurrentUserInfo();
  $scope.profileUser = $rootScope.currentUser;


}])
