'use strict';

describe('Component: CreateButtonComponent', function() {
  // load the controller's module
  beforeEach(module('browserApp.createButton'));

  var CreateButtonComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateButtonComponent = $componentController('createButton', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
