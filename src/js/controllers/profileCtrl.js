import app from '../app.js';

app.controller('profileCtrl', ['$scope', 'User', function($scope, User){
    (function getCurrentUserInfo() {
      User.getCurrentUserInfo()
      .then((data, err) => {
        $scope.user = data.data
      })
    })()
}])
