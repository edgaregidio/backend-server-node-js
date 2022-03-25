const express = require("express");
const crudControlle = require('../src/controller/crudControlle');
const Person = require("../src/models/Person");

const router = express.Router();

// ROUTER
router.get('/', crudControlle.index);
router.post('/', crudControlle.create)
router.get('/person', crudControlle.read)
router.get('/person/:id', crudControlle.readPerson)
router.patch('/person/:id', crudControlle.update)
router.delete('/person/:id', crudControlle.delete)

module.exports = router;