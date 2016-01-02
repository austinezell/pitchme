import app from "../../app.js";

app.controller("inboxCtrl", ["$scope", "User", "$stateParams", "$rootScope", "$state", "Message", function($scope, User, $stateParams, $rootScope, $state, Message){
  if(!$stateParams.num) $stateParams.num = 1;

  User.getCurrentUserInfo()
  .then(()=>{
    goToController()
  })
  let goToController = () => {
    $scope.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
    let num = $stateParams.num
    let index1 = (num-1) * 10;
    let index2 = 10 * num;
    $scope.messages = $rootScope.currentUser.messagesReceived.slice(index1, index2)
    $scope.readMessage = (id) => {
      Message.readMessage(id)
    }
  }


}])
