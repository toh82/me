module.exports = docData

var through = require('through2')
var extend = require('util')._extend
var getDocumentData = require('./getData')

function docData () {
  return through.obj(function (file, enc, cb) {

    var fileContent = file.contents.toString()
    var docData = getDocumentData(fileContent)

    if(!file.data){
      file['data'] = {}
    }
    extend(file.data, docData)

    if (file.isBuffer()) {
      file.contents = new Buffer(fileContent)
    }

    cb(null, file)
  })
}
