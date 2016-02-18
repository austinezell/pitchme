'use strict';
import app from '../../app.js';
import faqs from '../../misc/faq.js';

app.controller('homeCtrl', ['$scope', 'Pitch', function($scope, Pitch) {
  $scope.faqs = faqs;

  Pitch.getAll().then(res => {
    $scope.pitches = res.data.reverse()
  });

}]);
