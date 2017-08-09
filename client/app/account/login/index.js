'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('browserApp.login', [])
  .controller('LoginController', LoginController)
  .name;
