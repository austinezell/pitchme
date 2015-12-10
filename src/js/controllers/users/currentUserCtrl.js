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
      console.log('data');
      $scope.profileUser = data;
      console.log($scope.profileUser);
      $scope.aboutMe = "";
      $("#aboutMeModal textarea").val('')
      $rootScope.currentUser = data;
    })
  }




}])
