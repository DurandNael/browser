'use strict';
// @flow

import angular from 'angular';

type User = {
  name: string;
  email: string;
  password: string;
};

export default class SignupController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state,$scope, $rootScope ) {
    this.Auth = Auth;
    this.$state = $state;
   
  }

  register(form ) {
    this.submitted = true;

    if(form.$valid) {
     
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          
          this.$state.go('logout');
        })
        .catch(err => {
          err = err.data;
          console.log(err)
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
         if(err.name) {
            angular.forEach(err.fields, (error, field) => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
         }
         
        });
    }
  }
}