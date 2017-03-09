module.exports = articleList

var glob = require('glob')
var fs = require('fs')
var cheerio = require('cheerio')
var getDocumentData = require('../document/getData')
var _ = require('underscore')

/**
 * @private
 * @param {object} articles
 * @param {object} options
 * @returns {string}
 */
function renderArticleList(articles, options) {
  if(articles.length === 0) {
    return ''
  }

  articles = _.sortBy(articles, 'dateCode').reverse()

  var articlesHtml = ''
  articles.forEach(function (article) {
    articlesHtml = articlesHtml + options.fn(article)
  })

  return articlesHtml
}

/**
 * @private
 * @param {string} folder
 * @returns {Array}
 */
function getArticlesFromFolder(folder) {
  var baseFolder = './src/'
  var files = glob.sync(baseFolder + folder + '/*.html')
  var articles = []

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8')
    var $ = cheerio.load(content)

    articles.push({
      title: $('header > h1').text(),
      author: $('header > .author').text(),
      intro: $('.main > p.intro').text(),
      link: file.replace(baseFolder, ''),
      lang: $('html').attr('lang'),
      date: $('time').text(),
      dateCode: $('time').attr('datetime'),
      tags: getDocumentData(content, 'tags')
    })
  })

  return articles
}

/**
 * @public
 * @param {string} folder
 * @param {object} options
 * @returns {string}
 */
function articleList(folder, options) {
  var articles = getArticlesFromFolder(folder)

  return renderArticleList(articles, options)
}
