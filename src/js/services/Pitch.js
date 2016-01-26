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
}])
