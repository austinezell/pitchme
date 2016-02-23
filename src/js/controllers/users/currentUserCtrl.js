import app from "../../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;
  $scope.aboutMe = "";

  $scope.profileUser = $rootScope.currentUser;
  $scope.dateJoined = new Date($scope.profileUser.dateJoined);

  $scope.updateAboutMe = (aboutMe) => {
    User.update({aboutMe})
    .success(data=>{
      $scope.profileUser = data;
      $scope.aboutMe = "";
      $rootScope.currentUser = data;
    })
  }




}])
