const express = require('express');
const path = require('path');

const app = express();

const BP = require('body-parser');


app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.post("/novo_vozilo_ponuda", (req, res) => {
    res.send(req.body);
})


app.use('/novo_vozilo_ponuda', BP.urlencoded({ extended: false }));

app.listen(8000);