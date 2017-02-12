module.exports = tagNavigation

var glob = require('glob')
var fs = require('fs')

function tagNavigation (folder, options) {
  var baseFolder = './src/'
  var files = glob.sync(baseFolder + folder + '/*.html')
  var tagList = []

  function getDocumentData(content, which){
    var matches = content.match(/\|-.*.-\|/g)
    var docData = {}

    if (matches !== null) {
      matches.forEach(function (value) {
        var tmpData = value
          .replace('|-', '')
          .replace('-|', '')
          .split(':')

        docData[tmpData[0]] = tmpData[1]
      })
    }

    return docData[which]
  }

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8')
    var tags = getDocumentData(content, 'tags')

    tagList = tagList.concat(tags.split(','))
  })

  tagnavigationhtml = ''
  tagList.forEach(function (value) {
    tagnavigationhtml = tagnavigationhtml + options.fn({title: value})
  })

  return tagnavigationhtml
}
