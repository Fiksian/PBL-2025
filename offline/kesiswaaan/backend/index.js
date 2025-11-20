const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const studentRoutes = require('./routes/studentRoutes') //buatlah folder routes
app.use(cors())
app.use(express.json())

app.use('/api/students', studentRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
