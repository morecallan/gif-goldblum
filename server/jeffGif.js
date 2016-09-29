//// Interaction with requested website and scrape Jeff Gifs ////
const { load } = require('cheerio')
const { get } = require('request')


// Initiate Jeff Gifs in case of scrape failure.
let gifGoldblums = ["https://media.giphy.com/media/l0MYCzCMjRDsgqrUk/giphy.gif", "https://media.giphy.com/media/gim44Z9Ygw3Ic/giphy.gif", "https://media.giphy.com/media/mWYJsOqmvQcbm/giphy.gif", "http://www.reactiongifs.com/r/hapssh.gif", "http://www.reactiongifs.com/wp-content/uploads/2013/10/pos.gif", "https://media.giphy.com/media/HxXYHeQuEp0oU/giphy.gif", "https://media.giphy.com/media/NOLlgmFtbS6u4/giphy.gif"]

// Jeff Gif Scraper
const jeffGetter = () => {
  get(`http://giphy.com/search/jeff-goldblum`, (err, _, body)=> {
    const $ = load(body)
    $('.gifs-gif').each(function(i, gif){
      gifGoldblums.push($(gif).attr("data-animated"))
    })
  })
}

// Populate Jeff Gif Array and return singular Gif
module.exports.giphyGenerator = () => {
  jeffGetter();
  let gifGoldblum = gifGoldblums[Math.floor(Math.random() * (gifGoldblums.length))];
  return gifGoldblum
}