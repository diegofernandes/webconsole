/*
* Meccano IOT WebConsole
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
var fs = require('fs');
var yamlConfig = require('node-yaml-config');

module.exports = function() {
  try {
    fs.accessSync(process.env.CONFIG_FILE, fs.F_OK | fs.R_OK);
  } catch (ex) {
    console.log('Config file is not pressent or inaccessible! Check the path file %s', process.env.CONFIG_FILE);
    return {};
  }
  try {
    return yamlConfig.load(process.env.CONFIG_FILE, process.env.NODE_ENV);
  } catch (ex) {
    console.error(ex);
    return {};
  }
}
