'use strict';
import app from '../../app.js';
import faqs from '../../misc/faq.js';

app.controller('homeCtrl', ['$scope', 'Pitch', '$state', function($scope, Pitch, $state) {
  $scope.faqs = faqs;

  $scope.homeLocation = {};
  Pitch.getAll().then(res => {
    $scope.pitches = res.data.reverse().slice(0,10)
  });

}]);
