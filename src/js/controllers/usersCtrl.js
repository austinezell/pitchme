import app from '../app.js';

app.controller('usersCtrl', ['$scope', 'Auth', "User", function($scope, Auth, User) {
  $scope.isChecked = true;

  $scope.login = () => {
    let user = {
      username: $scope.username,
      password: $scope.password
    };
    Auth.login(user).then( () => {
      User.getCurrentUserInfo()
    })
  }

  $scope.register = (user) => {
    if (user.password === $scope.confirm){
      Auth.register(user).then( ()=>{
        User.getCurrentUserInfo()
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
