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
    }]
  })
  .state("home.faqs", {
    url: '/faqs',
    templateUrl: '/html/general/home/faq.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.homeLocation.name = $state.current.name.replace('home.', '');
    }]
  })
  .state("home.pitches", {
    url: '/pitches',
    templateUrl: '/html/general/home/pitches.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.homeLocation.name = $state.current.name.replace('home.', '');
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
  .state('users.me', {
    url: '/me',
    abstract: true,
    template: '<ui-view/>',
    controller: ['$rootScope', '$state', function($rootScope, $state){
      if (!$rootScope.currentUser) {
        $state.go('home.intro');
      }
    }]
  })
  .state('users.me.profile', {
    url: '/profile',
    templateUrl: 'html/users/profile.html',
    controller: 'currentUserCtrl'
  })
  .state('users.me.inbox', {
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
        controller: "suggestionCtrl"
      }
    }
  })
  .state('pitches.dashboard.admin',{
    url: '/admin',
    templateUrl: 'html/pitches/dashboard/admin.html',
    controller: ["$scope", "$state", function($scope, $state){
      $scope.currentLocation.name = "admin";
    }]
  })
}]);

app.directive("codeInput", function(){
  return function(scope, element, attrs){
    let selection = false;
    if (scope.newSuggestion.body === undefined) {
      scope.newSuggestion.body = "";
    }
    element.bind("keydown", function(evt){
      let el = element[0]
      let start =el.selectionStart, end =el.selectionEnd;
      if (evt.which === 192){
        if (start !== end){
          evt.preventDefault();
          let tempStr = scope.newSuggestion.body;
          scope.newSuggestion.body = `${tempStr.substring(0, start)}\`${tempStr.substring(start, end)}\`${tempStr.substring(end)}`
          scope.$apply();
          el.setSelectionRange(end+2, end+2);

          selection = true;
        }
      }
      else if (evt.which === 9){
        evt.preventDefault();
        let tempStr = scope.newSuggestion.body
        scope.newSuggestion.body = `${tempStr.substring(0, start)}  ${tempStr.substring(start)}`
        scope.$apply();
        el.setSelectionRange(start+2, start+2);
      }
    })
    element.bind("keyup", function(evt){
      if (selection){
        evt.preventDefault();
        return;
      }
      if (evt.which === 192){
        let el = element[0]
        scope.newSuggestion.body += "`";
        scope.$apply();
        let range = el.selectionStart;
        el.setSelectionRange(range-1, range-1);
      }
    })
  }
})

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

app.constant('localStorageKey', 'pitchMe-token');
