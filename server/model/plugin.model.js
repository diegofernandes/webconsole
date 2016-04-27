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

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define('Plugin', {
    id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    version: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    authorContact: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    engine: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    schedule: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    executionContext: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    documentation: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    repository: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    release: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    parameters: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  });
  return model;
}
