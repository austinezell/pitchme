import app from "../../app.js";

app.controller("currentUserCtrl", ["$scope", "User", "$rootScope", function($scope, User, $rootScope){
  $scope.me = true;

  let getProfileUser = () =>{
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
  }
  getProfileUser();

  $scope.updateAboutMe = (aboutMe) => {
    User.update({aboutMe})
    .success(data=>{
      $scope.profileUser = data;
      $scope.aboutMe = "";
      $("#aboutMeModal textarea").val('')
      $rootScope.currentUser = data;
    })
  }




}])
