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
      templateUrl: "./html/general/about.html"
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
      controller: 'currentUserCtrl'
    })
    // .state('profile', {
    //   url: "/profile/:username",
    //   templateUrl: 'html/users/profile.html',
    //   controller
    // })
    .state('add_pitch', {
      url: '/addPitch',
      templateUrl: "html/pitches/addPitch.html",
      controller: 'addPitchCtrl'
    })
    .state('pitch', {
      url: '/pitch/:id',
      templateUrl: "html/pitches/viewPitch.html",
      controller: 'viewPitchCtrl'
    })

  $urlRouterProvider.otherwise('/');
});
