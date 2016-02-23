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
  var model = sequelize.define('Fact', {
    channel: DataTypes.STRING,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    week_day: DataTypes.INTEGER,
    hour: DataTypes.INTEGER,
    minute: DataTypes.INTEGER,
    second: DataTypes.INTEGER,
    device_group: DataTypes.STRING,
    device: DataTypes.STRING,
    sensor: DataTypes.INTEGER,
    data: DataTypes.INTEGER,
    creationDate: DataTypes.DATE
  }, {
    freezeTableName: false,
    timestamps: false,
    defaultScope:{
      order:'creationDate DESC'
    }
  });

  model.removeAttribute('id');
  model.removeAttribute('createdAt');
  model.removeAttribute('updatedAt');

  return model;
}
