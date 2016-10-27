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
var validUrl = require('valid-url');

const quickCheck = (suspect) => {
  return validUrl.isUri(suspect) ? true : false;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const checkRequest = (inputUrl) => {

  let prefixedInputUrl = `www.${inputUrl}`

  return new Promise((resolve, reject) => {
      request.get(`${prefixedInputUrl}`, (err, _, body) => {
          if (!err) {
            resolve(`${prefixedInputUrl}`)
          } else {
            request.get(`http://${prefixedInputUrl}`, (err, _, body) => {
              if (!err) {
                resolve(`http://${prefixedInputUrl}`)
              } else {
                request.get(`http://${inputUrl}`, (err, _, body) => {
                  if (!err) {
                    resolve(`http://${inputUrl}`)
                  } else {
                    request.get(`https://${prefixedInputUrl}`, (err, _, body) => {
                      if (!err) {
                        resolve(`https://${prefixedInputUrl}`)
                      } else {
                        request.get(`https://${inputUrl}`, (err, _, body) => {
                          if (!err) {
                            resolve(`https://${inputUrl}`)
                          } else {
                            reject(prefixedInputUrl)
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
  }





//// Public viewery ////
app.use(express.static('client'))


//// Interaction with requested website ////
const { load } = require('cheerio')

//// Random Jeff Gif from scraper ////
const {giphyGenerator} = require('./jeffGif');





app.get('/gif/:url', (req, res) => {
  let url = req.params.url;
  checkRequest(url)
    .then((correctUrl) => {
    let usableUrl = correctUrl
    //// Init Functionality for Requested Image Replace
    request.get(usableUrl, (err, response, body) => {
      let $ = load(body)
      $('img').each(function(i, img){
        $(img).attr('src', giphyGenerator())
      })
      $('a').each(function(i, a){
        var currentRef = $(a).attr('href');
        $(a).attr('href', `https://gif-goldblum.herokuapp.com/#/gif/${currentRef}`)
      })
      $ = $.html()
      res.send($)
    })
  })
  .catch(console.error)
})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
