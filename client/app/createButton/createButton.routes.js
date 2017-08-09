'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('createButton', {
      url: '/createButton:id',
      template: '<create-button></create-button>'
    });
}
