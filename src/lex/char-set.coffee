utils = require('../utils/index')

exports.charset = charset = utils.charset

exports.digits = digits = '0123456789'
exports.lowers = lowers = 'abcdefghijklmnopqrstuvwxyz'
exports.uppers = uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
exports.letters = letters = lowers+uppers

exports.letterDigits = letterDigits = letters+digits
exports.letterDigitSet = charset letterDigits

exports.firstIdentifierChars = firstIdentifierChars = '$_'+letters
exports.identifierChars = identifierChars = firstIdentifierChars+digits

exports.digitCharSet = digitCharSet = charset(exports.digits)

exports.letterCharSet = letterCharSet = charset(exports.letters)

exports.firstIdentifierCharSet = charset('$_'+letters)
exports.jsIdentifierCharSet = exports.identifierCharSet = identifierCharSet = charset(identifierChars)
