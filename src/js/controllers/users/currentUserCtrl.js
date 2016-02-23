import app from "../../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;

  $scope.profileUser = $rootScope.currentUser;
  $scope.dateJoined = new Date($scope.profileUser.dateJoined);

  $scope.updateAboutMe = (aboutMe) => {
    User.update({aboutMe})
    .success(data=>{
      $scope.profileUser = data;
      $scope.aboutMe = "";
      $("#aboutMeModal textarea").val('');
      $rootScope.currentUser = data;
    })
  }




}])
