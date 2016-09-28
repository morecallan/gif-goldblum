#!/usr/bin/env node
"use strict";

//Setting Up App
const Express = require('express');
const app = express()
const PORT = process.env.PORT || 3000

//// Public viewery ////
app.use(express.static('client'))


//// Interaction with requested website ////
const { load } = require('cheerio')
const { get } = require('request')

//// Random Jeff Gif from scraper ////
const giphyGenerator = require('./jeffGif');


//// Init Functionality for Requested Image Replace
get(url, (err, _, body) => {
    $ = load(body)
    $('img').each(function(i, img){
      $(img).attr('src', giphyGenerator())
    })
    $ = $.html()
    res.end($)
  }
})

//// You know, like, listen on the port or something something darkside 
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
