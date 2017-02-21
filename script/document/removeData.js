module.exports = removeData

var through = require('through2')

function removeData () {
  return through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()

    fileContent = fileContent.replace(/\|-.*.-\|/g, '')
    if (file.isBuffer()) {
      file.contents = new Buffer(fileContent)
    }

    cb(null, file)
  })
}
