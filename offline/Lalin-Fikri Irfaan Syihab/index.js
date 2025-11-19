const express = require('express')
const app = express()
const port = 3001
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

const lalinMap = {Hi: "Hijau", Ku:"Kuning", Me:"Merah"}

app.get('/api/translate', (req, res) => {
    const sw = req.query.lampu; // on atau off
    if(!sw||!lalinMap[sw]){
        return res.status(400).json( {error: "lalin harus 'merah', 'kuning', atau 'hijau'."});
    }
    res.json({en: sw, id:lalinMap[sw]});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
