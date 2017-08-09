'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/main:nom',
    template: '<main></main>'
  });
}
