module.exports = loadData

var through = require('through2')
var extend = require('util')._extend
var getData = require('./getData')

function loadData () {
  return through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()

    if (!file.data) {
      file['data'] = {}
    }

    extend(
      file.data,
      getData(fileContent, null)
    )

    cb(null, file)
  })
}
