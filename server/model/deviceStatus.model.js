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
  var model = sequelize.define('DeviceStatus', {
    device: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    device_group: DataTypes.STRING,
    memo: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    creationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    lastAnnouncementDate: DataTypes.DATE,
    elapsedMinutes: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return model;
}
