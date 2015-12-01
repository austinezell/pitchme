import app from '../app.js';

app.controller('usersCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.isChecked = true;

  $scope.login = (user) => {
    Auth.login(user);
  }

  $scope.register = (user) => {
    if (user.password === $scope.confirm){
      Auth.register(user)
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
