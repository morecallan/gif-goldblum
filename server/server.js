#!/usr/bin/env node
"use strict";

//Setting Up App
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

//Parsing HTML req
// const got = require('got');
const request = require('request');

//// Public viewery ////
app.use(express.static('client'))


//// Interaction with requested website ////
const { load } = require('cheerio')
//const { get } = require('request')

//// Random Jeff Gif from scraper ////
const {giphyGenerator} = require('./jeffGif');





app.get('/gif/:url', (req, res) => {
  const url = req.params.url;
  console.log(url)
  //// Init Functionality for Requested Image Replace
  request.get(`https://${url}`, (err, _, body) => {
    let $ = load(body)
    $('img').each(function(i, img){
      $(img).attr('src', giphyGenerator())
    })
    $ = $.html()
    res.send($)
  })
})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
