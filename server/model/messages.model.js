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
  var model = sequelize.define('Message', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    device: DataTypes.STRING,
    sender: DataTypes.STRING,
    delivery_type: DataTypes.STRING,
    message: DataTypes.STRING,
    readDate: DataTypes.DATE,
    creationDate: DataTypes.DATE,
  }, {
    timestamps: false
  });


  return model;
}
