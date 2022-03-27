const express = require('express');
const { ValidateData } = require('../middlewares/ValidateData');
const PhBookService = require('../services/PhBookService');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await PhBookService.getAll();
    return res.status(200).json(contacts);    
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await PhBookService.getById(req.params.id);
    return res.status(200).json(contact);
  } catch (err) {
    next(err)
  }
});

router.post('/', ValidateData, async (req, res, next) => {
  try {
    const { name, email, image, phone } = req.body;
    const newContact = await PhBookService.add({ name, email, image, phone });
    return res.status(201).json(newContact);
  } catch (err) {
    return next(err)
  }
});

router.put('/:id', ValidateData, async (req, res, next) => {
  try {
    const { name, email, image, phone } = req.body;
    const contact = await PhBookService.update(req.params.id, name, email, image, phone);
    return res.status(200).json(contact);
  } catch (err) {
    return next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await PhBookService.exclude(req.params.id);
    return res.status(200).json(contact);    
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
