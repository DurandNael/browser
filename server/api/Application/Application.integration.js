'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newApplication;

describe('Application API:', function() {
  describe('GET /api/Applications', function() {
    var Applications;

    beforeEach(function(done) {
      request(app)
        .get('/api/Applications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Applications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Applications).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/Applications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Applications')
        .send({
          name: 'New Application',
          info: 'This is the brand new Application!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newApplication = res.body;
          done();
        });
    });

    it('should respond with the newly created Application', function() {
      expect(newApplication.name).to.equal('New Application');
      expect(newApplication.info).to.equal('This is the brand new Application!!!');
    });
  });

  describe('GET /api/Applications/:id', function() {
    var Application;

    beforeEach(function(done) {
      request(app)
        .get(`/api/Applications/${newApplication._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Application = res.body;
          done();
        });
    });

    afterEach(function() {
      Application = {};
    });

    it('should respond with the requested Application', function() {
      expect(Application.name).to.equal('New Application');
      expect(Application.info).to.equal('This is the brand new Application!!!');
    });
  });

  describe('PUT /api/Applications/:id', function() {
    var updatedApplication;

    beforeEach(function(done) {
      request(app)
        .put(`/api/Applications/${newApplication._id}`)
        .send({
          name: 'Updated Application',
          info: 'This is the updated Application!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedApplication = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedApplication = {};
    });

    it('should respond with the updated Application', function() {
      expect(updatedApplication.name).to.equal('Updated Application');
      expect(updatedApplication.info).to.equal('This is the updated Application!!!');
    });

    it('should respond with the updated Application on a subsequent GET', function(done) {
      request(app)
        .get(`/api/Applications/${newApplication._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let Application = res.body;

          expect(Application.name).to.equal('Updated Application');
          expect(Application.info).to.equal('This is the updated Application!!!');

          done();
        });
    });
  });

  describe('PATCH /api/Applications/:id', function() {
    var patchedApplication;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/Applications/${newApplication._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Application' },
          { op: 'replace', path: '/info', value: 'This is the patched Application!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedApplication = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedApplication = {};
    });

    it('should respond with the patched Application', function() {
      expect(patchedApplication.name).to.equal('Patched Application');
      expect(patchedApplication.info).to.equal('This is the patched Application!!!');
    });
  });

  describe('DELETE /api/Applications/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/Applications/${newApplication._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Application does not exist', function(done) {
      request(app)
        .delete(`/api/Applications/${newApplication._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
