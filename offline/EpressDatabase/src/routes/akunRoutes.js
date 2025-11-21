// src/routes/akunRoutes.js
const express = require('express');
const router = express.Router();
const AkunController = require('../controllers/akunControllers');

// READ ALL dan CREATE
router.route('/')
    .get(AkunController.getAllAkun)
    .post(AkunController.createAkun);

// READ by ID, UPDATE, dan DELETE
router.route('/:id')
    .get(AkunController.getAkunById)
    .put(AkunController.updateAkun)
    .delete(AkunController.deleteAkun);

module.exports = router;