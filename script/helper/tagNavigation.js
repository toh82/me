module.exports = tagNavigation

var glob = require('glob')
var fs = require('fs')
var getDocumentData = require('../document/getData')
var _ = require('underscore')

function getTagList (files) {
  var tagList = []

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8')
    var tags = getDocumentData(content, 'tags')

    tagList = _.union(tagList, tags.split(','))
  })

  return tagList
}

function renderTagList (tagList, options) {
  var tagnavigationhtml = ''
  tagList.forEach(function (value) {
    tagnavigationhtml = tagnavigationhtml + options.fn({title: value})
  })

  return tagnavigationhtml
}

function tagNavigation (folder, options) {
  var baseFolder = './src/'
  var files = glob.sync(baseFolder + folder + '/*.html')
  var tagList = getTagList(files)

  return renderTagList(tagList, options)
}
