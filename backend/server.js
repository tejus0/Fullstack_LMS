import app from './app.js'
import dbcon from './config/Database.js'
// const dbconn = require('./config/Database.js')

dbcon()
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})