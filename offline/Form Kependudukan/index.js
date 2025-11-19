const express = require('express');
const app = express();
const port = 3001;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const kelamin = { LK: "Laki-Laki", PR: "Perempuan" };
const status = { lajang: "Lajang", kawin: "Kawin", cerai: "Cerai" };

// Fungsi menentukan keterangan
function getKeterangan(jk, stat) {
    if (jk === "LK" && stat === "lajang") return "Perjaka";
    else if (jk === "PR" && stat === "lajang") return "Perawan";
    else if (stat === "kawin") return "Menikah";
    else if (jk === "LK" && stat === "cerai") return "Duda";
    else return "Janda";
    return "-";
}

app.get('/api/translate', (req, res) => {
    const jk = req.query.kelamin;
    const stat = req.query.status;

    let errors = [];

    if (!jk || !kelamin[jk]) {
        errors.push("Kelamin harus 'LK' atau 'PR'.");
    }

    if (!stat || !status[stat]) {
        errors.push("Status harus 'lajang', 'kawin', atau 'cerai'.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const keterangan = getKeterangan(jk, stat);

    res.json({
        kelamin: kelamin[jk],
        status: status[stat],
        keterangan
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
