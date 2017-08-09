'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import settings from './settings';
import signup from './signup';
import applications from './applications';

export default angular.module('browserApp.account', [uiRouter, login, settings, signup, applications])
  .config(routing)
  .factory('Application', ['$http', function($http){
    var Application = {}

    Application.load = function(id){
      return new Promise(function(resolve,reject){
        $http.get('/api/applications/' + id).then(function(app){
          Application.instance = app.data
          resolve()
        })
      })
    }

    Application.save = function(id, newApp){
      console.log(newApp)
        $http.put('/api/applications/' + id, newApp).then(function(app){
          console.log(app)
          Application.instance = app.data
      })
    }

    return Application
}])
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  }).name;