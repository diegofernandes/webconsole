'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var deviceStatusCtrlStub = {
  index: 'deviceStatusCtrl.index',
  show: 'deviceStatusCtrl.show'
};


var historyStatusCtrlStub = {
  index: 'historyStatusCtrlStub.index',
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
var deviceStatusIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './deviceStatus.controller': deviceStatusCtrlStub,
  './historyStatus.controller': historyStatusCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Device Status API Router:', function() {

  it('should return an express router instance', function() {
    deviceStatusIndex.should.equal(routerStub);
  });

  describe('GET /api/deviceStatus', function() {

    it('should route to deviceStatus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'deviceStatusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/deviceStatus/status', function() {

    it('should route to deviceStatus.controller.show', function() {
      routerStub.get
        .withArgs('/status', 'authService.isAuthenticated', 'deviceStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/deviceStatus/status/:status', function() {

    it('should route to deviceStatus.controller.show', function() {
      routerStub.get
        .withArgs('/status/:status', 'authService.isAuthenticated', 'deviceStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/deviceStatus/:device', function() {

    it('should route to deviceStatus.controller.show', function() {
      routerStub.get
        .withArgs('/:device', 'authService.isAuthenticated', 'deviceStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });


  describe('GET /api/deviceStatus/history', function() {

    it('should route to deviceStatus.controller.show', function() {
      routerStub.get
        .withArgs('/history', 'authService.isAuthenticated', 'historyStatusCtrlStub.index')
        .should.have.been.calledOnce;
    });

  });
});
