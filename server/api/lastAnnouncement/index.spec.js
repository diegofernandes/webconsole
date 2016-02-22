'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lastAnnouncementCtrlStub = {
  index: 'lastAnnouncementCtrl.index'
};

var routerStub = {
  get: sinon.spy()
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
var lastAnnouncementIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lastAnnouncement.controller': lastAnnouncementCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Message API Router:', function() {

  it('should return an express router instance', function() {
    lastAnnouncementIndex.should.equal(routerStub);
  });

  describe('GET /api/lastAnnouncements', function() {

    it('should route to lastAnnouncement.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'lastAnnouncementCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
