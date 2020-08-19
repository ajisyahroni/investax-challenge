const express = require('express')
const app = express();
const log = console.log;
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors()) //cors
app.use(bodyParser.json()) // parsing content type as app/json
app.use(bodyParser.urlencoded({ extended: true })) // parsing x-form-data


// routing
const mainRoutes = require('./routes')
app.use('/', mainRoutes);
app.use('/photos', express.static(path.join(__dirname, 'albums')))

const port = 8888;
app.listen(port, () => log('running'));