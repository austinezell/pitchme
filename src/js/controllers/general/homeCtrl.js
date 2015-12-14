'use strict';

import app from '../../app.js';
import faqs from '../../misc/faq.js';

app.controller('homeCtrl', ['$scope', 'Pitch', function($scope, Pitch) {

  $scope.faqs = faqs;

  Pitch.getAll().then(res => {
    $scope.pitches = res.data.reverse()
  });

  angular.element(document).ready(function() {
    $("#faq-scroll").click(function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $("#faq-top").offset().top - 50
      }, 'slow');
    });

    $("#pitch-scroll").click(function(e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $("#pitches-top").offset().top - 50
      }, 'slow');
    });

    let $window = $(window)
    $window.scroll(function() {
      if ($window.scrollTop() > 160) {
        $("#to-disappear").css("opacity", 1 - ($window.scrollTop() - 160) / 250);
      } else if ($window.scrollTop() === 0) {
        $("#to-disappear").css("opacity", 1)
      } else if (($window).scrollTop()) {

      }
    });
  });




}]);
