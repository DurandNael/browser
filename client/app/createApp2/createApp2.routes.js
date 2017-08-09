'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('createApp2', {
      url: '/createPage',
      template: '<create-app2></create-app2>'
    });
}
