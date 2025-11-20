let students = [];
let nextId = 1; // Variabel ini sekarang akan menghasilkan nilai untuk

/**
 * Mengembalikan semua siswa.
 * @returns {Array} Daftar semua siswa.
 */
exports.getAllStudents = () => {
    return students;
};

// --- Fungsi yang Mencari berdasarkan  ---

exports.getStudentById = (id) => {
    // Perbaikan: Menggunakan 'parseInt' dengan benar dan mencari properti 'NIS'
    return students.find(student => student.studentCode === parseInt(id));
};


exports.addStudent = (newStudent) => {
    // ✅ PERUBAHAN UTAMA: Menetapkan ID baru ke properti 'NIS'
    const studentWithId = {
        studentCode: nextId++, // Menggunakan 'nextId' untuk mengisi 'NIS'
        ...newStudent,
    };
    students.push(studentWithId);
    return studentWithId;
};

// --- Fungsi yang Memperbarui berdasarkan NIS ---


exports.updateStudent = (id, updatedData) => {
    // Perbaikan: Menggunakan 'parseInt(nis, 10)' dan mencari properti 'NIS'
    const studentIndex = students.findIndex(student => student.studentCode === parseInt(id));

    if (studentIndex !== -1) {
        students[studentIndex] = {
            ...students[studentIndex],
            ...updatedData,
            // Penting: Pastikan NIS tidak berubah setelah di-set
            studentCode: students[studentIndex].studentCode
        };
        return students[studentIndex];
    }
    return null;
};

// --- Fungsi yang Menghapus berdasarkan NIS ---

exports.deleteStudent = (id) => {
    // Perbaikan: Menggunakan 'parseInt(nis, 10)' dan mencari properti 'NIS'
    const studentIndex = students.findIndex(student => student.studentCode === parseInt(id));

    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        return deletedStudent[0];
    }
    return null;
};


exports.searchStudents = (query) => {
    // Diasumsikan tidak ada perubahan pada fungsi ini
    return students.filter(student => student.studentCode && student.studentCode.toLowerCase().includes(query.toLowerCase()));
};