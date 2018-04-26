const express = require('express');
let router = express.Router();
const chirpStore = require('../chirpstore');

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.send(chirpStore.GetChirp(id));
    } else {
    res.send(chirpStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    console.log('posting some stuff');
    console.log(req.body);
    chirpStore.CreateChirp(req.body);
    res.send(req.body);
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.body);
    chirpStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id)
    res.sendStatus(200);
});


module.exports = router;