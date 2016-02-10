'use strict';
import app from '../../app.js';
import faqs from '../../misc/faq.js';

app.controller('homeCtrl', ['$scope', 'Pitch', '$window', function($scope, Pitch, $window) {
  console.log('home controller loaded');

  $scope.faqs = faqs;

  Pitch.getAll().then(res => {
    $scope.pitches = res.data.reverse()
  });

  angular.element(document).ready(function() {
    $(".scroll").click(function(event) {
      event.preventDefault();
      const location = $(this).attr("href");
      $('html,body').animate({
        scrollTop: $(location).offset().top - 50
      }, 'slow');
    });

    let $window = $(window);
    $window.off();
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
