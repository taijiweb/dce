# parser.isKeyword

hasOwnProperty = Object.hasOwnProperty

module.exports = (item) -> hasOwnProperty.call(@keywordMap, item)
