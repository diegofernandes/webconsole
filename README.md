# About Meccano IoT Project
![](https://david-dm.org/meccano-iot/webconsole.svg) [![Build Status](https://travis-ci.org/meccano-iot/webconsole.svg?branch=master)](https://travis-ci.org/meccano-iot/webconsole) [![Coverage Status](https://coveralls.io/repos/github/meccano-iot/webconsole/badge.svg?branch=master)](https://coveralls.io/github/meccano-iot/webconsole?branch=master)

Meccano project is a multi-purpose IoT (Internet of Things) board and software platform created by Luciano Kadoya, Rogério Biondi, Diego Osse and Talita Paschoini. Its development started in early 2014 as a closed R&D project in the Software Architecture Division, with the aim of creating a board which is robust, based on a modern microprocessor (ESP8266), cheap, easy to implement and deploy through the 750 retail stores to perform several functions, such as:

- Count the number of visitors in each store to calculate the sales/visits ratio;
- Get the vote/feedback of users regarding the services;
- Voice marketing;
- Energy saving initiatives;
- Beacons and interaction of the customer in the physical store;
- Several other undisclosed applications;

Different from other ESP8266 projects, Meccano board has been heavily tested in retail stores and adjusted to be safe against RF (radio frequency) interferences. The physical store is an inhospitable environment since there are several hundreds of electronic products, such as TVs, computers, sound and home theaters as well as electronic home appliances.

The project is still in its early stages and will evolve in the future. Magazine Luiza will plan the backlog and sponsor the project. It has been open-sourced because it´s the first initiative to create a board based on ESP8266 in Brazil and we are really excited about the possibilities. Magazine Luiza has a passion for innovations and contribution to the development of technology. So you are invited to join us because your support/collaboration is welcome!


# Meccano IoT Web Console

<image src="images/webconsole.png" width=800 />

Meccano IoT Web Console is a web console to administrate the devices. With this admin you can:

- Register new devices. Approve or disapprove them.
- Send commands to devices.
- Find the device status.
- Monitor your devices in the last hours.
- View custom reports created by Meccano Service Manager


## Usage
The project was built using [Angular Fullstack](https://github.com/angular-fullstack/generator-angular-fullstack).

Dev Tools
```
sudo npm install -g grunt yo bower grunt-cli
```

Install
```
npm install
bower install
```

Configure
```
# Set the environment variables
# If you prefer, please record them in the .bash_profile or in the initialization script.
export MYSQL_URI=mysql://user:pass@host:port/database
```

Quick run
```
grunt serve
```

Test
```
grunt test
```

Distribute
```
grunt dist
```

Install on Distribute folder
```
npm install --production
```

Run on Distribute folder
```
NODE_ENV=production node server/app.js
```

## Configuration


The configuration of Meccano IoT Web Console is simple. You should configure the ./config/config.yml file or set the environment variables.

### Yaml file configuration

```
default:
  seedDB: true
  mysql:
    uri: 'mysql://user:pass@host:port/database'
    username: user
    password: pass
    database: IOTDB
    options:
      host: host
      port: port
      logging: true
      poll:
        maxConnections: 10
        minConnections: 1
```
**Note:** You can only use mysql uri or split properties(username,password, database,host,port).
Each configuration parameter has the corresponding environment variable. They'll be better explained in the next session.


### Environment variables

- **API_SECURITY**: Enable or disable the security system.(default:`true`). Disable this is only recommended for test purposes.

- **SHOW_CONFIG**: If `true` show the configs.(default:`true`).

- **SECRETS_SESSION**: The JWT secret.

- **SECRETS_SESSION_TIME**: The JWT expires time.

- **PORT**: The listener port.

- **ADDRESS**: The listener host.

 - **SEED_DB**: creates the user admin when not found any user with admin role.

This include a default admin user with credentials:

```
admin@admin.con/admin
```

 - **SERVICEMANAGER_URL**: The service maneger api url.

#### Database configuration

The parameters bellow control the connection and behavior of the RDBMS.
You can use all in one:

- **MYSQL_URI**: the uri connection string(`mysql://user:pass@host:port/database`).

Or you can use split configuration:

- **MYSQL_HOST**: database hostname or IP address.

- **MYSQL_PORT**: database port.

- **MYSQL_USER**: database user.

- **MYSQL_PASSWORD**: database password.

- **MYSQL_OPTIONS_POOL_MAXCONNECTIONS**: Max connections number on the connections poll

- **MYSQL_OPTIONS_POOL_MINCONNECTIONS**: Min connections number on the connections poll

**Note:** You can only use mysql URI or split configuration(username,password, database,host,port).


### High Availability Setup (HA)

Meccano Webconsole may be configured to High Availability in a simple way.
You should configure two or more webconsole instances and load balance them.
In most cases, the webconsole are grouped together with Meccano ServiceManager in the same instances/machines.
