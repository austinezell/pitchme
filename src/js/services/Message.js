import app from "../app.js";

app.service('Message', ["$http", "User", function($http, User){

  this.readMessage = (id)=>{
     $http.put('/messages/read', {id, update: {isRead: true, dateRead: new Date}})
     .then(()=>{
       User.getCurrentUserInfo()
     })
  }

}])
