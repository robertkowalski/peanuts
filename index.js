var assert = require("assert"),
    blockrApi = require("./lib/connectors.js").blockrio

exports.blockr = function (type, wallets, opts, cb) {
  assert.ok(Array.isArray(wallets), "argument must be an Array")
  assert(typeof opts === "object", "must have options")
  assert(typeof cb === "function", "must have callback")

  blockrApi(type, wallets, opts)
    .start(function (err, result) {
      if (err) return cb(err)
      cb(null, result)
    })
}
