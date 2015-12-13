'use strict';

import app from '../../app.js';

app.controller('homeCtrl', ['$scope', 'Pitch', function($scope, Pitch) {

  $scope.faqs = [{
    question: "Does your amazing service cost anything?",
    answer: "Not a damn thing. If you want to donate, we do \
    accept payment in the form of antique photos/paintings \
    of lighthouses. (If you really want to donate, but can't \
    afford a lighthouse we'll take a windmill)."
  }, {
    question: "Do you handle payment if people working on a project \
    agree to some sort of compensation?",
    answer: "No. Venmo will! Or PayPal. Or wire transfers from a bank. \
    Or cash. Or anything that isn't us. We don't handle that."
  }, {
    question: "How does it work?",
    answer: "Technology, man. Technology."
  }, {
    question: "How do I get started?",
    answer: "Elementary, Watson! Click the dropdown menu, then go to \"Login\" \
    create an account and you will be given the oppurtunity to pitch an idea \
    and/or work with others on ideas!"
  }]

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
