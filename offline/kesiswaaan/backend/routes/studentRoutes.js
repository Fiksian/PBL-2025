// /routes/studentsRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');

//rute untuk mendapatkan semua siswa dan menambahkan siswa baru
router.route('/')
.get(studentController.getAllStudents)
.post(studentController.addStudent)

//rute untuk mendapatkan memperberharui dan menghaspus siswa berdasarkan id
router.route('/:id')
.get(studentController.getStudentById)
.put(studentController.updateStudent)
.delete(studentController.deleteStudent);

//rute mencari siswa
router.get('/search', studentController.searchStudents);

module.exports = router;
