'use strict';

import app from './app.js';

app.constant('localStorageKey', 'pitchMe-token');

// app.run(function($rootScope, $location){
//     $rootScope.$on('$stateChangeStart',
//       function (event, toState, toParams){
//         console.log(toParams, event, toState)
//       });
// })

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './html/general/home.html',
    controller: 'homeCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: './html/users/login.html',
    controller: 'usersCtrl'
  })
  .state('me', {
    url: '/me',
    templateUrl: 'html/users/profile.html',
    controller: 'currentUserCtrl'
  })
  // .state('profile', {
  //   url: "/profile/:username",
  //   templateUrl: 'html/users/profile.html',
  //   controller: "profileCtrl"
  // })
  .state('add_pitch', {
    url: '/add_pitch',
    templateUrl: "html/pitches/addPitch.html",
    controller: 'addPitchCtrl'
  })
  // .state('pitch', {
  //   url: '/pitch/:id',
  //   templateUrl: "html/pitches/viewPitch.html",
  //   controller: 'viewPitchCtrl'
  // })
  // .state('inbox', {
  //   url: '/inbox/:num',
  //   templateUrl: "html/users/inbox.html",
  //   controller: "inboxCtrl"
  // })
  .state("my_pitches", {
    url: "/pitches/mine",
    templateUrl: "html/pitches/myPitches.html",
    controller: "myPitchesCtrl"
  })
  // .state("dashboard", {
  //   url: "/pitches/dashboard/:id",
  //   templateUrl: "html/pitches/dashboard/main.html",
  //   abstract: true,
  //   controller: "dashboardCtrl"
  // })
  // .state("dashboard.overview",{
  //   url: "/overview",
  //   templateUrl: "html/pitches/dashboard/overview.html",
  //   controller: function($scope, $state){
  //     $scope.currentLocation.name = $state.current.name.replace('dashboard.', '');
  //     $scope.$apply;
  //   }
  // })
  // .state("dashboard.issues",{
  //   url: "/issues",
  //   templateUrl: "html/pitches/dashboard/issues.html",
  //   controller: function($scope, $state){
  //     $scope.currentLocation.name = $state.current.name.replace('dashboard.', '');
  //     $scope.$apply;
  //   }
  // })
  // .state("dashboard.admin",{
  //   url: "/admin",
  //   templateUrl: "html/pitches/dashboard/admin.html",
  //   controller: function($scope, $state){
  //     $scope.currentLocation.name = $state.current.name.replace('dashboard.', '');
  //     $scope.$apply;
  //   }
  // })
});
