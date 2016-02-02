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

var pool = require('../../config/mysql');

/*
* Submit registration
*/
exports.post = function(req, res) {
  var message = req.body;
  saveMessage(message, res);
};

/*
* Get registration information
*/
exports.get = function(req, res) {

  var id = req.params.id;
  getMessage(id, res);
};

/*
* Get message by device
*/
exports.getByDevice = function(req, res) {

  var device = req.params.device;
  getMessagesByDevice(device, res);
};

/*
* Unregister device
*/
exports.delete = function(req, res) {

  var id = req.params.id;
  deleteMessage(id, res)
};

/**
* Saves the object to the database
*/
function saveMessage(object, res) {
  console.log("Posting message to the database...");
  var op = pool.query('insert into Messages set ?', object, function(error, result) {
    if (error) {
      console.error('Error posting message:', error);
      res.status(500).json({
        operation: 'POST',
        message: 'ERROR',
        cause: error
      });
    } else {
      console.log("Message enqueued...");
      res.status(200).json({
        operation: 'POST',
        message: 'MESSAGE_ENQUEUED'
      });
    }
  });
}

/**
* Get the object to the database
*/
function getMessage(id, res) {
  console.log("Get message #" + id + " from the database...");
  var op = pool.query('select * from `Messages` where `ID` = ?', id, function(error, result, fields) {
    if (error) {
      res.json({
        'operation' : 'GET',
        'message' : 'INTERNAL_ERROR',
        'cause' : error
      });
      return;
    }
    if (result.length === 0) {
      // Unknown device
      res.status(404).json({
        'operation': 'GET',
        'status' : 'NOT FOUND'
      });
    } else {
      var r = result[0];
      res.status(200).json(r);
    }
  });
}

/**
* Get messages of a device
*/
function getMessagesByDevice(device, res) {
  console.log("Getting messages of device " + device + "...");
  var op = pool.query('select * from `Messages` where `device` = ?', device, function(error, result, fields) {
    if (error) {
      res.json({
        'operation' : 'GET',
        'message' : 'INTERNAL_ERROR',
        'cause' : error
      });
      return;
    }
    res.status(200).json(result);
  });
}

/**
* Delete Message
*/
function deleteMessage(id, res) {
  console.log("Deleting message...");
  var op = pool.query('delete from `Messages` where `ID` = ?', id, function(error, result, fields) {
    if (error) {
      res.json({
        'operation' : 'DELETE',
        'message' : 'INTERNAL_ERROR',
        'cause' : error
      });
    } else {
      // Unknown device
      res.json({
        'operation': 'DELETE',
        'ID' : id,
        'status' : 'DELETED'
      });
    }
  });
}
