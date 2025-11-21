const resultBox = document.getElementById('result');

// Fungsi untuk menampilkan hasil respons
function displayResult(data, status, message) {
    let output = `Status: ${status}\n`;
    output += `Pesan: ${message}\n\n`;
    if (typeof data === 'object') {
        output += JSON.stringify(data, null, 2);
    } else {
        output += data;
    }
    resultBox.textContent = output;
}

// Fungsi untuk operasi CREATE dan UPDATE
async function submitAkun(method) {
    event.preventDefault(); // Mencegah form submit default

    const form = document.getElementById('akunForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const id = data.id;

    let url = `/api/akun`;
    if (method === 'PUT') {
        url = `/api/akun/${id}`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const message = await response.text();
        displayResult(message, response.status, method === 'POST' ? 'CREATE' : 'UPDATE');
    } catch (error) {
        displayResult(error.message, 'ERROR', 'Gagal Koneksi ke Server');
    }
}

// Fungsi untuk operasi READ
async function readAkun(type) {
    const readId = document.getElementById('readId').value;
    let url = '/api/akun';

    if (type === 'ID') {
        if (!readId) {
            displayResult('Harap masukkan ID Akun', '400', 'READ by ID Gagal');
            return;
        }
        url = `/api/akun/${readId}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const message = response.ok ? 'Berhasil' : 'Gagal';
        displayResult(data, response.status, `READ ${type}`);
    } catch (error) {
        displayResult(error.message, 'ERROR', 'Gagal Koneksi ke Server');
    }
}

// Fungsi untuk operasi DELETE
async function deleteAkun() {
    event.preventDefault(); // Mencegah form submit default
    const deleteId = document.getElementById('deleteId').value;

    if (!deleteId) {
        displayResult('Harap masukkan ID Akun', '400', 'DELETE Gagal');
        return;
    }

    try {
        const response = await fetch(`/api/akun/${deleteId}`, {
            method: 'DELETE'
        });

        const message = await response.text();
        displayResult(message, response.status, 'DELETE');
    } catch (error) {
        displayResult(error.message, 'ERROR', 'Gagal Koneksi ke Server');
    }
}