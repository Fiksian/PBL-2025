const express = require('express')
const app = express()
const port = 3001


//1.  Variable akses ke folder
const path= require("path")

//2. membuat folder bernama public
//3. perintah akses folder "public"
app.use(express.static(path.join(__dirname, "public")))

//4. variable tetap untuk definisi saklar
const lampMap = {On:"Hidup", Off:"Mati"};

// 5. buatlah file index.html di public

//6. Endpoint API sederhana untuk menerjemahkan status saklar
app.get("/api/translate",(req,res)=>{
    const sw = req.query.switch; // on atau off
    if(!sw||!lampMap[sw]){
        return res.status(400).json( {error: "switch harus 'on' atau 'off'."});
    }
    res.json({en: sw, id:lampMap[sw]});
})

/* Tampil di Konsol */
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
