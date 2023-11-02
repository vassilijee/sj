const express = require('express');
const path = require('path');
const Joi = require('joi');
const app = express();
const BP = require('body-parser');
const fs = require("fs");


const shema = Joi.object().keys({
    model: Joi.string().trim().min(2).max(25).required(),
    motor: Joi.string().trim().min(1).required(),
    kategorija: Joi.string().trim().length(1).required(),
    cena: Joi.number().greater(0).required()
});



app.use(express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
})
app.use('/novo_vozilo_ponuda', BP.urlencoded({ extended: false }));

app.post("/novo_vozilo_ponuda", (req, res) => {
    const { error, succ } = shema.validate(req.body);
    //req.body.opis.replace(/\r?\n|\r/g, '<br>');
    if (error) {
        res.send("Greska: " + error.details[0].message);
        return;
    } else {
        fs.appendFileSync("vozila.txt",
            JSON.stringify(req.body) + "\n",
        );

        res.send("Poruka je poslana, očekujte odgovor");
        res.send(req.body);
        console.log(req.body)
    }
})

app.get("/vozila", (req, res) => {
    const vozila = [];

    fs.readFile('vozila.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send({ error: "Greška" });
            return;
        } else {
            const redovi = data.split('\n');
            //console.log(redovi);
            // dodao sam - 1 jer kada se u .txt nalazi poslednji red u kom nema nista, JSON.parse pukne tu
            for (let i = 0; i < redovi.length - 1; i++) {
                let obj = JSON.parse(redovi[i]);
                vozila.push(obj);
            }
        }
        res.json(vozila);
        //i ovde dalje nastavljamo parsovanje redova i punjenje niza
    });



    //res.send("sva vozila");
})



app.listen(8000);