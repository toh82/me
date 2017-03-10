module.exports = getData

/**
 *
 * @param {string} content
 * @param {string} which
 * @returns {object}
 */
function getData (content, which) {
  which = which || null

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

  if (which !== null) {
    return docData[which]
  }

  return docData
}
