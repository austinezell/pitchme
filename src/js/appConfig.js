'use strict';

import app from './app.js';

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './html/general/home.html',
    controller: 'homeCtrl'
  })

  .state('users',{
    url: '/users',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('users.login', {
    url: '/login',
    templateUrl: './html/users/login.html',
    controller: 'usersCtrl'
  })
  .state('users.user', {
    url: '/:username',
    templateUrl: 'html/users/profile.html',
    controller: 'profileCtrl'
  })


  .state('me', {
    url: '/me',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('me.profile', {
    url: '/profile',
    templateUrl: 'html/users/profile.html',
    controller: 'currentUserCtrl'
  })
  .state('me.inbox', {
    url: '/inbox/:num',
    templateUrl: 'html/users/inbox.html',
    controller: 'inboxCtrl'
  })

  .state('pitches', {
    url: '/pitches',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('pitches.add', {
    url: '/add',
    templateUrl: 'html/pitches/addPitch.html',
    controller: 'addPitchCtrl'
  })
  .state('pitches.view', {
    url: '/view/:id',
    templateUrl: 'html/pitches/viewPitch.html',
    controller: 'viewPitchCtrl'
  })
  .state('pitches.mine', {
    url: '/mine',
    templateUrl: 'html/pitches/myPitches.html',
    controller: 'myPitchesCtrl'
  })
  .state('pitches.dashboard', {
    url: '/dashboard/:id',
    templateUrl: 'html/pitches/dashboard/main.html',
    abstract: true,
    controller: 'dashboardCtrl'
  })
  .state('pitches.dashboard.overview',{
    url: '/overview',
    templateUrl: 'html/pitches/dashboard/overview.html',
    controller: function($scope, $state){
      $scope.currentLocation.name = $state.current.name.replace('pitches.dashboard.', '');
      $scope.$apply;
    }
  })
  .state('pitches.dashboard.issues',{
    url: '/issues',
    templateUrl: 'html/pitches/dashboard/issues.html',
    controller: function($scope, $state){
      $scope.currentLocation.name = $state.current.name.replace('pitches.dashboard.', '');
      $scope.$apply;
    }
  })
  .state('pitches.dashboard.admin',{
    url: '/admin',
    templateUrl: 'html/pitches/dashboard/admin.html',
    controller: function($scope, $state){
      $scope.currentLocation.name = $state.current.name.replace('pitches.dashboard.', '');
      $scope.$apply;
    }
  })
});

app.constant('localStorageKey', 'pitchMe-token');
