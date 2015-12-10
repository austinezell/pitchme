'use strict';

import app from '../../app.js';

app.controller('homeCtrl', ['$scope', 'Pitch', function($scope, Pitch) {
  Pitch.getAll().then(res => {
    $scope.pitches = res.data
  })
}]);
