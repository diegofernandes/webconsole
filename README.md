# About Meccano IoT Project

Meccano project is a multi-purpose IoT (Internet of Things) board and software platform created by Luciano Kadoya, Rogério Biondi, Diego Osse and Talita Paschoini. Its development started in early 2014 as a closed R&D project in the Software Architecture Division, with the aim of creating a board which is robust, based on a modern microprocessor (ESP8266), cheap, easy to implement and deploy through the 750 retail stores to perform several functions, such as:

- Count the number of visitors in each store to calculate the sales/visits ratio;
- Get the vote/feedback of users regarding the services;
- Voice marketing;
- Energy saving initiatives;
- Beacons and interaction of the customer in the physical store;
- Several other undisclosed applications;

Different from other ESP8266 projects, Meccano board has been heavily tested in retail stores and adjusted to be safe against RF (radio frequency) interferences. The physical store is an inhospitable environment since there are several hundreds of electronic products, such as TVs, computers, sound and home theaters as well as electronic home appliances.

The project is still in its early stages and will evolve in the future. Magazine Luiza will plan the backlog and sponsor the project. It has been open-sourced because it´s the first initiative to create a board based on ESP8266 in Brazil and we are really excited with the possibilities. Magazine Luiza has a passion for innovations and contribution to the development of technology. So you are invited to join us because your support/collaboration is welcome!


# Meccano IoT Web Console

![](https://david-dm.org/meccano-iot/meccano-webconsole.svg)

Meccano IoT Web Console is a web console to administrate the devices. With this admin you can:
- Register new devices.
- Send commands to devices.
- Find the device status.


## Usage
The project was built using [Angular Fullstack](https://github.com/angular-fullstack/generator-angular-fullstack).

Dev Tools
```
npm install -g grunt yo bower
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
export MYSQL_HOST=mysql_addres
export MYSQL_PORT=3306
export MYSQL_USER=user
export MYSQL_PASSWORD=pass
export MYSQL_DATABASE=IOTDB
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


Configuration of Meccano IoT Web Console is simple. You should configure the ./config/config.yml file or set the environment variables.

### Yaml file configuration

```
default:
  seedDB: true
  mysql:
    host: 'iotdb_hostname'
    port: 3306
    user: 'user'
    password: 'password'
    database: 'IOTDB'
```

Each configuration parameter have the corresponding environment variable. They'll be better explained in the next session.


### Environment variables

#### Seed Database

 - **SEED_DB**: creates the user admin when not found any user with admin role.


#### Database configuration

The parameters bellow control the connection and behaviour of the RDBMS.

- **MYSQL_HOST**: database hostname or ip address.

- **MYSQL_PORT**: database port.

- **MYSQL_USER**: database user.

- **MYSQL_PASSWORD**: database password.

- **MYSQL_DATABASE**: database name or instance id.

- **MYSQL_CONNECTIONLIMIT**: maximum number of connections.
