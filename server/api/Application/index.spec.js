'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var ApplicationCtrlStub = {
  index: 'ApplicationCtrl.index',
  show: 'ApplicationCtrl.show',
  create: 'ApplicationCtrl.create',
  upsert: 'ApplicationCtrl.upsert',
  patch: 'ApplicationCtrl.patch',
  destroy: 'ApplicationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ApplicationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './Application.controller': ApplicationCtrlStub
});

describe('Application API Router:', function() {
  it('should return an express router instance', function() {
    expect(ApplicationIndex).to.equal(routerStub);
  });

  describe('GET /api/Applications', function() {
    it('should route to Application.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ApplicationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/Applications/:id', function() {
    it('should route to Application.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ApplicationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/Applications', function() {
    it('should route to Application.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ApplicationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/Applications/:id', function() {
    it('should route to Application.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ApplicationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/Applications/:id', function() {
    it('should route to Application.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ApplicationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/Applications/:id', function() {
    it('should route to Application.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ApplicationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
