const express = require('express');
let router = express.Router();
const chirpStore = require('../chirpstore');

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(chirpStore.GetChirp(id));
    } else {
    res.send(chirpStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    console.log('posting some stuff');
    console.log(req.body);
    chirpStore.CreateChirp(req.body);
    // res.sendStatus(200);
    res.send(req.body);
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.UpdateChirp(id);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id)
    res.sendStatus(200);
});


module.exports = router;