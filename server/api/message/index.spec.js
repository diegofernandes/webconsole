'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var messagesCtrlStub = {
  index: 'messagesCtrl.index',
  show: 'messagesCtrl.show',
  create: 'messagesCtrl.create',
  update: 'messagesCtrl.update',
  destroy: 'messagesCtrl.destroy'
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
var messagesIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './message.controller': messagesCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Message API Router:', function() {

  it('should return an express router instance', function() {
    messagesIndex.should.equal(routerStub);
  });

  describe('GET /api/messages', function() {

    it('should route to messages.controller.index', function() {
      routerStub.get
        .withArgs('/','authService.isAuthenticated', 'messagesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/messages/:id', function() {

    it('should route to messages.controller.show', function() {
      routerStub.get
        .withArgs('/:id','authService.isAuthenticated', 'messagesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/messages', function() {

    it('should route to messages.controller.create', function() {
      routerStub.post
        .withArgs('/','authService.hasRole.user', 'messagesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/messages/:id', function() {

    it('should route to messages.controller.update', function() {
      routerStub.put
        .withArgs('/:id','authService.hasRole.user', 'messagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/messages/:id', function() {

    it('should route to messages.controller.update', function() {
      routerStub.patch
        .withArgs('/:id','authService.hasRole.user', 'messagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/messages/:id', function() {

    it('should route to messages.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id','authService.hasRole.user', 'messagesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
