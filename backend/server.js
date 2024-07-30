import app from './app.js'
import dbcon from './config/Database.js'
// const dbconn = require('./config/Database.js')
import cloudinary from 'cloudinary'

dbcon()


// Configuration 
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})