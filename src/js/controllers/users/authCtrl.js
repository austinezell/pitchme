import app from '../../app.js';

app.controller('usersCtrl', ['$scope', 'Auth', "$state", "User", function($scope, Auth, $state, User) {
  $scope.isChecked = true;

  $scope.login = () => {
    let user = {
      username: $scope.username,
      password: $scope.password
    };
    Auth.login(user).then( () => {
      User.getCurrentUserInfo();
      $state.go('users.me.profile');
    })
  }

  $scope.register = (user) => {
    if (user.password === $scope.confirm){
      Auth.register(user).then( ()=>{
        User.getCurrentUserInfo();
        $state.go('users.me.profile');
      })
    }
    else {
      swal({
        title: "Passwords do not match!",
        text: "Please re-enter your passwords and try again",
        type: "error",
        showConfirmButton: true,
        closeOnConfirm: true,
        timer: 2500
      });
    }
  }
}]);
