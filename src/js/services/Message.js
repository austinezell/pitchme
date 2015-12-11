import app from "../app.js";

app.service('Message', ["$http", "User", function($http, User){

  this.readMessage = (id)=>{
     $http.put('/messages/read', {id})
     .then(()=>{
       User.getCurrentUserInfo()
     })
  }

}])
