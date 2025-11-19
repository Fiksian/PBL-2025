const selectEL = document.getElementById('lalin');
const outputEL = document.getElementById('output');
const trafficEL = document.querySelector('.traffic');



async function updateOutput(){
    const val = selectEL.value;
    try {
        const value = await fetch(`/api/translate?lampu=${encodeURIComponent(val)}`);
        const data = await value.json();
        outputEL.textContent = data.id || "-";
        trafficEL.style.backgroundColor =
            val === "Me" ? "red" :
                val === "Ku" ? "yellow" :
                    val === "Hi" ? "green" :
                        "black";
    }catch{
        outputEL.textContent = "-";
        }
    }

selectEL.addEventListener('change', updateOutput);
updateOutput();