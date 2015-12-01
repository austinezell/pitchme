'use strict';
app = angular.module('pitchMe');

app.controller('navCtrl', function($scope, Auth, $state) {
  $scope.logout = function (){
    Auth.logOut();
  }
});
