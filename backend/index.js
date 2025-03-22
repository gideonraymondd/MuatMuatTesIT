const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use('/api',routes)

app.listen(3001, () => console.log('Server Running'));