'use strict';

import app from '../app.js'

app.service('Pitch', ["$state", "$http", function($state, $http){
  this.createPitch = (pitch) => {
    $http.post('/pitches/create', pitch)
    .then( data =>{
      swal({
        title: "Pitch Created",
        type: "success",
        text: "Pitch Successfully Created",
        timer: 800
      })
    })
  }

  this.addIssue= (issue, pitchId) =>{
    return $http.post(`/pitches/addIssue/${pitchId}`, issue)
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

  this.getAll = () => {
    return $http.get('/pitches')
  }

  this.getOneById = (id) =>{
    return $http.get(`/pitches/one/${id}`)
  }

  this.request = (pitchId, pitcherId) => {
    return $http.post('/pitches/request', {pitchId, pitcherId})
  }

  this.addComment = (comment, pitchId) =>{
    return $http.post('/pitches/addComment', {comment, pitchId})
  }

  this.getDetails = (pitchId) => {
    return $http.get(`/pitches/details/${pitchId}`)
  }

  this.getIssue = (issueId) =>{
    return $http.get(`/pitches/issues/one/${issueId}`)
  }

  this.addSuggestion = (suggestion, issueId) =>{
    return $http.post(`/pitches/addSuggestion/${issueId}`, suggestion);
  }
}])
