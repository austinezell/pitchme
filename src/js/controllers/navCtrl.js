'use strict';
import app from '../app.js';

app.controller('navCtrl', function($scope, Auth, $state) {
  $scope.logout = function (){
    Auth.logOut();
  }
});
