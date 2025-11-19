const selectEL = document.getElementById('kelamin');
const selectEB = document.getElementById('status');
const outputEL = document.getElementById('output');

async function updateOutput() {
    const kelamin = selectEL.value;
    const status = selectEB.value;

    if (!kelamin || !status) {
        outputEL.textContent = "-";
        return;
    }

    try {
        const response = await fetch(
            `/api/translate?kelamin=${encodeURIComponent(kelamin)}&status=${encodeURIComponent(status)}`
        );

        const data = await response.json();

        // tampilkan keterangan
        outputEL.textContent = data.keterangan || "-";

    } catch (err) {
        console.error(err);
        outputEL.textContent = "-";
    }
}

selectEL.addEventListener('change', updateOutput);
selectEB.addEventListener('change', updateOutput);

// Jalankan pertama kali
updateOutput();
