'use strict';

describe('Component: CreateApp2Component', function() {
  // load the controller's module
  beforeEach(module('createApp2'));

  var CreateApp2Component;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreateApp2Component = $componentController('createApp2', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
