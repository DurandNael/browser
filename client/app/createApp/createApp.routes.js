'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('createApp', {
      url: '/createApp',
      template: '<create-app></create-app>'
    });
}
