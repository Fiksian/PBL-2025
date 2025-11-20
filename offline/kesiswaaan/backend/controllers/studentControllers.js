const studentModels = require('../models/studentModels');

//Dapatkan semua siswa
exports.getAllStudents = (req, res) => {
    const students = studentModels.getAllStudents();
    res.json(students);
}

//Dapatkan siswa berdasarkan ID
exports.getStudentById = (req, res) => {
    const student = studentModels.getStudentById(req.params.id);
    if (student) {
        res.json(student);
    }
    else {
        res.status(404).send('Student Not Found');
    }
};

//Tambahkan siswa baru
exports.addStudent = (req, res) => {
    const newStudent = req.body;
    const addedStudent = studentModels.addStudent(newStudent);
    res.status(201).json(addedStudent);
};

// perbaharui data siswa
exports.updateStudent = (req, res) => {
    const updateStudent = studentModels.updateStudent(req.params.id, req.body);
    if (updateStudent) {
        res.json(updateStudent);
    }
    else {
        res.status(404).send('Student Not Found');
    }
}

//Hapus siswa
exports.deleteStudent = (req, res) => {
    const deletedStudent = studentModels.deleteStudent(req.params.id);
    if (deletedStudent) {
        res.json(deletedStudent);
    }
    else {
        res.status(404).send('Student Not Found');
    }
}

//cari siswa
exports.searchStudents = (req, res) => {
    const students = studentModels.searchStudents(req.query.q);
    res.json(students);
}