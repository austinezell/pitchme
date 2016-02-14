'use strict';
import app from '../../app.js';
import faqs from '../../misc/faq.js';

app.controller('homeCtrl', ['$scope', 'Pitch', function($scope, Pitch) {
  $scope.faqs = faqs;

  Pitch.getAll().then(res => {
    $scope.pitches = res.data.reverse()
  });

  angular.element(document).ready(function() {
    $(".scroll").click(function(event) {
      event.preventDefault();
      const location = $(this).attr("href");
      $('body').animate({
        scrollTop: $(location).offset().top - 50
      }, 'slow');
    });

    let $window = $(window);
    $window.off("scroll");
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
