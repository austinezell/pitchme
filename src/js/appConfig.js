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
  .state('profile', {
    url: "/profile/:username",
    templateUrl: 'html/users/profile.html',
    controller: "profileCtrl"
  })
  .state('add_pitch', {
    url: '/add_pitch',
    templateUrl: "html/pitches/addPitch.html",
    controller: 'addPitchCtrl'
  })
  .state('pitch', {
    url: '/pitch/:id',
    templateUrl: "html/pitches/viewPitch.html",
    controller: 'viewPitchCtrl'
  })
  .state('inbox', {
    url: '/inbox/:num',
    templateUrl: "html/users/inbox.html",
    controller: "inboxCtrl"
  })
  .state("my_pitches", {
    url: "/pitches/mine",
    templateUrl: "html/pitches/myPitches.html",
    controller: "myPitchesCtrl"
  })
  .state("pitch_dashboard", {
    url: "/pitches/dashboard/:id",
    templateUrl: "html/pitches/dashboard.html",
    controller: "dashboardCtrl"
  })

  $urlRouterProvider.otherwise('/');
});
