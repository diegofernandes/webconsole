'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var navCtrlStub = {
  index: 'navCtrl.index'
};


var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var authServiceStub = {
  isAuthenticated:function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

// require the index with our stubbed out modules
var navIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './nav.controller': navCtrlStub,
  '../auth/auth.service': authServiceStub
});

describe('Nav Router:', function() {

  it('should return an express router instance', function() {
    navIndex.should.equal(routerStub);
  });

  describe('GET /nav', function() {

    it('should route to nav.controller.index', function() {
      routerStub.get
        .withArgs('/','authService.isAuthenticated', 'navCtrl.index')
        .should.have.been.calledOnce;
    });
  });

});
