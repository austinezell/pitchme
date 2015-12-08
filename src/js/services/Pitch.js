'use strict';

import app from '../app.js'

app.service('Pitch', ["$state", "$http", function($state, $http){
  this.createPitch = (pitch) => {
    $http.post('/pitches/create', pitch)
    .then( (data, err)=>{
      console.log(data);
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

  this.addComment = (comment, pitch) =>{
    $http.post('/pitches/addComment', {comment, pitch})
    .then(data=>{
      
    })
  }
}])
