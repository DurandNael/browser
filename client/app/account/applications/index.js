'use strict';

import angular from 'angular';
import ApplicationsController from './applications.controller';

export default angular.module('browserApp.applications', [])
  .controller('ApplicationsController', ApplicationsController)
  .name;
