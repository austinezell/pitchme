'use strict';

import app from './app.js';

app.constant('localStorageKey', 'pitchMe-token');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './html/general/home.html',
      controller: 'homeCtrl'
    })
    .state('info', {
      url: '/info',
      templateUrl: "./html/general/home.html"
    })
    .state('login', {
      url: '/login',
      templateUrl: './html/users/login.html',
      controller: 'usersCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './html/users/register.html',
      controller: 'usersCtrl'
    })
    .state('me', {
      url: '/me',
      templateUrl: 'html/users/profile.html',
      controller: 'profileCtrl'
    })
    .state('addPitch', {
      url: '/addPitch',
      templateUrl: "html/pitches/addPitch.html",
      controller: 'addPitchCtrl'
    })
  $urlRouterProvider.otherwise('/');
});
