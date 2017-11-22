'use strict';

const express = require('express');
const Controller = require('./controller');

const router = express.Router();

router.get('/', Controller.getBeveragesTypes);
router.get('/refreshers', Controller.getRefreshers);
router.get('/expresso', Controller.getExpresso);

module.exports = router;

/*
REST endpoints

/drinks
    /beverages
        /refreshers
        /espresso
        /chocolate
        /frappuccino-blended
    /iced-coffee
        /cold-brew
        /freshly-brewed
    /iced-tea
    /evolution-fresh
    /smoothies
*/