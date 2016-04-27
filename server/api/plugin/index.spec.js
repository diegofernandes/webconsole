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
  index : 'pluginCtrl.index',
  show : 'pluginCtrl.show',
  create : 'pluginCtrl.create',
  update : 'pluginCtrl.update',
  destroy : 'pluginCtrl.destroy'
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
var pluginIndex = proxyquire('./index', {
    'express': {
      Router: function() {
          return routerStub;
      }
    },
  './plugin.controller': pluginCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Plugin API Router:', function() {

  it('should return an express router instance', function() {
    pluginIndex.should.equal(routerStub);
  });

  describe('GET /api/plugins', function() {
    it('should route to plugin.controller.index', function() {
      routerStub.get
        .withArgs('/','authService.isAuthenticated', 'pluginCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/plugins/:id', function() {
    it('should route to plugin.controller.show', function() {
      routerStub.get
        .withArgs('/:id','authService.isAuthenticated', 'pluginCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/plugins', function() {
    it('should route to plugin.controller.create', function() {
      routerStub.post
        .withArgs('/','authService.hasRole.user', 'pluginCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/plugins/:id', function() {
    it('should route to plugin.controller.update', function() {
      routerStub.put
        .withArgs('/:id','authService.hasRole.user', 'pluginCtrl.update')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/plugins/:id', function() {
    it('should route to plugin.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id','authService.hasRole.user', 'pluginCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });

});
