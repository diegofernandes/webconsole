/*
* Meccano IOT Webconsole
*
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/

'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var deviceCtrlStub = {
  index: 'deviceCtrl.index',
  show: 'deviceCtrl.show',
  create: 'deviceCtrl.create',
  update: 'deviceCtrl.update',
  destroy: 'deviceCtrl.destroy'
};

var statisticCtrlStub = {
  index: 'statisticCtrl.index'
};

var activityCtrlStub = {
  index: 'activityCtrl.index'
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
var deviceIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './device.controller': deviceCtrlStub,
  './activity.controller': activityCtrlStub,
  './statistic.controller': statisticCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Device API Router:', function() {

  it('should return an express router instance', function() {
    deviceIndex.should.equal(routerStub);
  });

  describe('GET /api/device', function() {

    it('should route to device.controller.index', function() {
      routerStub.get
        .withArgs('/','authService.isAuthenticated', 'deviceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/device/:device/statistics', function() {

    it('should route to statistic.controller.show', function() {
      routerStub.get
        .withArgs('/:device/statistics','authService.isAuthenticated', 'statisticCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/device/:device/activity', function() {

    it('should route to activity.controller.show', function() {
      routerStub.get
        .withArgs('/:device/activity','authService.isAuthenticated', 'activityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/device/:device', function() {

    it('should route to device.controller.show', function() {
      routerStub.get
        .withArgs('/:device','authService.isAuthenticated', 'deviceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/device', function() {

    it('should route to device.controller.create', function() {
      routerStub.post
        .withArgs('/','authService.hasRole.user', 'deviceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/device/:device', function() {

    it('should route to device.controller.update', function() {
      routerStub.put
        .withArgs('/:device','authService.hasRole.user', 'deviceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/device/:device', function() {

    it('should route to device.controller.update', function() {
      routerStub.patch
        .withArgs('/:device','authService.hasRole.user', 'deviceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/device/:device', function() {

    it('should route to device.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:device','authService.hasRole.user', 'deviceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });





});
