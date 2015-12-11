import app from "../../app.js";

app.controller("inboxCtrl", ["$scope", "User", "$stateParams", function($scope, User, $stateParams){
  $scope.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  let num = $stateParams.num
  let index1 = (num-1) * 10;
  $scope.messages = currentUser.messagesReceived.slice(1, 10)

  $scope.readMessage = (id) => {
    
  }
}])
