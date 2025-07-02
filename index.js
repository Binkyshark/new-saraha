import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bootstrap from './src/bootstrap.js'
const app = express()
const port = 5000

bootstrap(app, express)



app.listen(port, () => console.log(`server is running on port ${port}`))


