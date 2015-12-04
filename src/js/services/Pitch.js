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
}])
