/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import bluebird from 'bluebird';
import moment from 'moment';
import _ from 'lodash';

var User = sqldb.User;
var Application = sqldb.Application; 

bluebird.each([

  () => User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    return User.bulkCreate([{
      _id: 1,
      provider: 'local',
      name: 'Test',
      email: 'test@example.com',
      password: 'test'
    }, {
      _id: 2,
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
    }])
    .then(() => {
      console.log('finished populating users');
    });
  })
], _.attempt);

bluebird.each([

  () => Application.sync()
  .then(() => Application.destroy({ where: {} }))
  
], _.attempt);