'use strict';

describe('Component: CreateAppComponent', function() {
  // load the controller's module
  beforeEach(module('createApp'));

  var CreateAppComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateAppComponent = $componentController('createApp', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
