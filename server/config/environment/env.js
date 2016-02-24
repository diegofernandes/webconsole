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
module.exports = {
  api: {
    security: process.env.API_SECURITY
  },
  seedDB: process.env.SEED_DB,
  showConfig: process.env.SHOW_CONFIG,
  secrets: {
    session: process.env.SECRETS_SESSION,
    sessionTime: process.env.SECRETS_SESSION_TIME,
  },
  port: process.env.PORT,
  address: process.env.ADDRESS,
  mysql: {
    uri: process.env.MYSQL_URI,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    options: {
      logging: process.env.MYSQL_OPTIONS_LOGGING,
      pool: {
        maxConnections: process.env.MYSQL_OPTIONS_POOL_MAXCONNECTIONS,
        minConnections: process.env.MYSQL_OPTIONS_POOL_MINCONNECTIONS
      },
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT
    }
  }
};
