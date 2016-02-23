import app from '../app.js'

app.service('Issue', ["$state", "$http", function($state, $http){

  this.getIssue = (issueId) =>{
    return $http.get(`/issues/one/${issueId}`)
  }

  this.addIssue= (issue, pitchId) =>{
    return $http.post(`/issues/addIssue/${pitchId}`, issue)
    .success((data)=>{
      swal({
        title: "Issue Reported",
        type: "success",
        text: "Your issue has been reported",
        timer: 1000
      })
    })
    .error((err)=>{
      swal({
        title: "Error",
        type: "error",
        text: "Something went wrong! Make sure all fields are filled out, or try again later!",
        timer: 3000
      })

    })
  }

  this.addSuggestion = (suggestion, issueId) =>{
    return $http.post(`/issues/addSuggestion/${issueId}`, suggestion);
  }
}]);
