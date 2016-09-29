#!/usr/bin/env node
"use strict";

//Setting Up App
const Express = require('express');
const app = express()
const PORT = process.env.PORT || 3000

//Parsing HTML req
const got = require('got');


//// Public viewery ////
app.use(express.static('client'))


//// Interaction with requested website ////
const { load } = require('cheerio')
const { get } = require('request')

//// Random Jeff Gif from scraper ////
const giphyGenerator = require('./jeffGif');


app.get('/:url', (req, res) => {
  const url = req.params.url;
  //// Init Functionality for Requested Image Replace
  got(url)
    .then((response)=> {
      console.log(response.body)
      $ = load(response.body)
      $('img').each(function(i, img){
        $(img).attr('src', giphyGenerator())
      })
      $ = $.html()
      res.send($)
    })
    .catch((error) => {
      console.log(error.response.body)
    })
  }
})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
