'use strict';
import app from '../../app.js';

app.controller('navCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function (){
    Auth.logOut();
  }
}]);
