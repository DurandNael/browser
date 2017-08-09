'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/getbtns', controller.getbtns);
router.post('/getconfig', controller.getconfig);
router.post('/getpage', controller.getpage);
router.post('/testpage', controller.testpage);
router.post('/', controller.create);
router.post('/', controller.create);
router.post('/createrepo', controller.createrepo);
router.post('/createrepopage', controller.createrepopage);
router.post('/deleteapp', controller.deleteapp);
router.post('/copyapp', controller.copyapp);
router.post('/save', controller.save);
router.post('/addpage', controller.addpage);
router.post('/addbuton', controller.addbuton);
router.post('/dl', controller.dl);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.post('/uploadScreen', controller.uploadScreen);
router.post('/uploadScreenindex', controller.uploadScreenWithIndex);

module.exports = router;
