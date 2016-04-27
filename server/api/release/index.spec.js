'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var releasesCtrlStub = {
  index: 'releasesCtrl.index',
  download: 'releasesCtrl.download',
  show: 'releasesCtrl.show',
  create: 'releasesCtrl.create',
  update: 'releasesCtrl.update',
  destroy: 'releasesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

// require the index with our stubbed out modules
var releasesIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './release.controller': releasesCtrlStub,
  '../../auth/auth.service': authServiceStub,
  'multer': function() {
    return {
      single: function(name) {
        return 'upload.single.' + name;
      }
    };
  }
});

describe('Release API Router:', function() {

  it('should return an express router instance', function() {
    releasesIndex.should.equal(routerStub);
  });

  describe('GET /api/releases', function() {

    it('should route to releases.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'releasesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/releases/:id', function() {

    it('should route to releases.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'releasesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/releases/:id/download', function() {

    it('should route to releases.controller.download', function() {
      routerStub.get
        .withArgs('/:id/download','releasesCtrl.download')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/releases', function() {

    it('should route to releases.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.user', 'upload.single.firmware', 'releasesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/releases/:id', function() {

    it('should route to releases.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.user', 'releasesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/releases/:id', function() {

    it('should route to releases.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.user', 'releasesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/releases/:id', function() {

    it('should route to releases.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.user', 'releasesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
