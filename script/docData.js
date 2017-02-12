module.exports = docData

var through = require('through2')
var extend = require('util')._extend

function docData () {
  return through.obj(function (file, enc, cb) {

    var fileContent = file.contents.toString()
    var matches = fileContent.match(/\|-.*.-\|/g)

    var docData = {}
    if (matches !== null) {

      matches.forEach(function (value) {
        fileContent = fileContent.replace(value, '')
        var tmpData = value
          .replace('|-', '')
          .replace('-|', '')
          .split(':')

        docData[tmpData[0]] = tmpData[1]
      })
    }

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
