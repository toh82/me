module.exports = articleList;

var glob = require('glob');
var fs = require('fs');
var cheerio = require('cheerio')

function articleList (folder, options) {
  var baseFolder = './src/';
  var files = glob.sync(baseFolder + folder + '/*.html');
  var articles = '';

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8');
    var $ = cheerio.load(content);

    articles = articles + options.fn({
      title: $('header > h1').text(),
      author: $('header > .author').text(),
      intro: $('.main > p.intro').text(),
      link: file.replace(baseFolder, '')
    })

  });

  return articles;
}
