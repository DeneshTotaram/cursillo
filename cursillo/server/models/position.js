var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['number', 'name'];

var schema = function (user) {
    var obj = {
      "number": null,
      "name": null,
      "description": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (position, cb) {
  connection.query('INSERT INTO position SET ?', [position], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Position', cb);
};

var findById = function (positionId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Position ' +
    'WHERE id = ?', [positionId], cb
  );

};

var deleteById = function (positionId, cb) {

  connection.query(
    'DELETE FROM Position WHERE id = ?', [positionId], cb
  );

};

var updateById = function (positionId, position, cb) {
  connection.query('UPDATE Position SET ? WHERE id = ' + positionId, schema(position), cb);
};

var Position = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Position;
