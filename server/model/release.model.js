/*
* Meccano IOT Model
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

var semver = require('semver');

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define('Release', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('ESP8266'),
      allowNull: false,
    },
    major: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patch: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prerelease: DataTypes.STRING(20),
    description: DataTypes.STRING(1024),
    firmwareBlob: {
      type: DataTypes.BLOB('medium'),
      allowNull: false,
    }
  }, {
    getterMethods: {
      version: function() {
        var version = this.major + '.' + this.minor + '.' + this.patch;
        if (this.prerelease)
          version += '-' + this.prerelease;
        return version;
      }
    },
    setterMethods:{
      version: function (version) {
         var v = semver.parse(version);
         if(v){
           this.setDataValue('major', v.major);
           this.setDataValue('minor', v.minor);
           this.setDataValue('patch', v.patch);
         }else {
           throw new Error('Version Invalid. The Version should be a Semantic Versioning(Major.Minor.Patch).')
         }
      }
    },
    defaultScope: {
      order: 'major DESC, minor DESC, patch DESC'
    }
  });


  return model;
}
