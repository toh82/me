module.exports = getData

var fm = require('front-matter')

/**
 * @param {string} content
 * @param {string|null} which
 * @returns {object}
 */
function getData (content, which) {
  which = which || null

  var docData = fm(content).attributes

  if (which !== null) {
    return docData[which]
  }

  return docData
}
