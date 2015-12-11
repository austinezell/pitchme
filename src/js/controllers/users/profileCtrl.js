import app from '../../app.js';

app.controller('profileCtrl', ['$scope', 'User', '$stateParams', function($scope, User, $stateParams){
  $scope.me = false
  User.getProfileUser($stateParams.username)
  .then(res=>{
    $scope.profileUser = res.data;
  })

}])
