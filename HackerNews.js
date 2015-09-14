var rp = require('request-promise');
var cheerio = require('cheerio')

exports.top = function () {
  return rp('https://news.ycombinator.com')
    .then( function (html) {
      // console.log(html)
      var $ = cheerio.load(html)
      top30 = []
      $('span.comhead').each(function(i, element){
        var a = $(this).prev();
        var rank = a.parent().parent().text();
        var title = a.text();
        var url = a.attr('href');
        var subtext = a.parent().parent().next().children('.subtext').children();
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var comments = $(subtext).eq(2).text();
        var metadata = {
          rank: parseInt(rank),
          title: title,
          url: url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments)
        }
        top30.push(metadata)
      });
      return top30;
    })
}