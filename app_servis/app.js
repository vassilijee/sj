const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.post("/novo-jelo", (req, res) => {
    res.send(req.body);
})

const BP = require('body-parser');

app.use('/novo-jelo', BP.urlencoded({ extended: false }));

app.listen(8000);