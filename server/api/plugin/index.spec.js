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

var pluginCtrlStub = {
  index: 'pluginCtrl.index',
  show: 'pluginCtrl.show',
  create: 'pluginCtrl.create',
  update: 'pluginCtrl.update',
  destroy: 'pluginCtrl.destroy'
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
  './plugin.controller': pluginCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Device API Router:', function() {

  it('should return an express router instance', function() {
    pluginIndex.should.equal(routerStub);
  });

  describe('GET /api/plugin', function() {
    it('should route to plugin.controller.index', function() {
      routerStub.get
        .withArgs('/','authService.isAuthenticated', 'pluginCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/plugin/:plugin', function() {
    it('should route to plugin.controller.show', function() {
      routerStub.get
        .withArgs('/:plugin','authService.isAuthenticated', 'pluginCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/plugin`', function() {
    it('should route to device.controller.create', function() {
      routerStub.post
        .withArgs('/','authService.hasRole.user', 'pluginCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/plugin/:plugin', function() {
    it('should route to plugin.controller.update', function() {
      routerStub.put
        .withArgs('/:plugin','authService.hasRole.user', 'pluginCtrl.update')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/plugin/:plugin', function() {
    it('should route to plugin.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:plugin','authService.hasRole.user', 'pluginCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
