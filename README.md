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
  mysql:
    host: 'iotdb_hostname'
    port: 3306
    user: 'user'
    password: 'password'
    database: 'IOTDB'
```

Each configuration parameter have the corresponding environment variable. They'll be better explained in the next session.


### Environment variables


#### Database configuration

The parameters bellow control the connection and behaviour of the RDBMS.

- **MYSQL_HOST**: database hostname or ip address.

- **MYSQL_PORT**: database port.

- **MYSQL_USER**: database user.

- **MYSQL_PASSWORD**: database password.

- **MYSQL_DATABASE**: database name or instance id.

- **MYSQL_CONNECTIONLIMIT**: maximum number of connections.
