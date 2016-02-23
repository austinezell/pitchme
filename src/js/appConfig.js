'use strict';

import app from './app.js';

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    templateUrl: './html/general/home.html',
    abstract: true,
    controller: 'homeCtrl'
  })
  .state("home.intro", {
    url: '/',
    templateUrl: '/html/general/home/intro.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.homeLocation.name = $state.current.name.replace('home.', '');
      $scope.$apply;
    }]
  })
  .state("home.faqs", {
    url: '/faqs',
    templateUrl: '/html/general/home/faq.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.homeLocation.name = $state.current.name.replace('home.', '');
      $scope.$apply;
    }]
  })
  .state("home.pitches", {
    url: '/pitches',
    templateUrl: '/html/general/home/pitches.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.homeLocation.name = $state.current.name.replace('home.', '');
      $scope.$apply;
    }]
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
    controller: ["$scope", "$state", function($scope, $state){
      $scope.currentLocation.name = $state.current.name.replace('pitches.dashboard.', '');
      $scope.$apply;
    }]
  })
  .state('pitches.dashboard.issues',{
    templateUrl: 'html/pitches/dashboard/issues.html',
    controller: "issuesCtrl",
    url: '/issues'
  })
  .state('pitches.dashboard.issues.details', {
    url: '/one/:issueId',
    templateUrl: 'html/pitches/dashboard/issues/details.html',
    controller: "singleIssueCtrl"
  })
  .state('pitches.dashboard.issues.details.suggestion', {
    url: '/suggestion/:sugId',
    views: {
      "suggestion@pitches.dashboard.issues": {
        templateUrl: "html/pitches/dashboard/issues/suggestion.html",
        controller: ["$scope", "$state", function($scope, $state){
          $scope.currentLocation.name = "issues";
          $scope.currentLocation.sugId = $state.params.sugId;
        }]
      }
    }
  })
  .state('pitches.dashboard.admin',{
    url: '/admin',
    templateUrl: 'html/pitches/dashboard/admin.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.currentLocation.name = "admin";
      $scope.$apply;
    }]
  })
}]);

app.constant('localStorageKey', 'pitchMe-token');
