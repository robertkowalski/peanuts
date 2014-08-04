var request = require("request"),
    assert = require("assert")

exports.blockrio = blockrio
function blockrio (type, wallets, opts) {
  return new Blockrio (type, wallets, opts)
}

function Blockrio (type, wallets, opts) {
  if (!(this instanceof Blockrio)) {
    return new Blockrio(type, wallets, opts)
  }

  var url
  if (opts.url)
    url = opts.url
  else
    url = "http://" + type +
      ".blockr.io/api/v1/address/balance/"

  wallets = wallets.join(",")
  this.address = url + wallets
}

Blockrio.prototype.request = function (cb) {
  request({
    uri: this.address,
    method: 'GET',
    json: true
  }, function (err, res, json) {
    if (err) return cb(err)
    cb(null, json)
  })
}

Blockrio.prototype.normalize = function (json) {
  if (json.data && json.data.balance)
    return [json.data.balance]

  return json.data.reduce(function (acc, curr) {
    acc.push(curr.balance)
    return acc
  }, [])
}

Blockrio.prototype.start = function (cb) {
  this.request(function (err, data) {
    if (err) return cb(err)
    try {
      var res = this.normalize(data)
    } catch (e) {
      err = e
    }
    if (err) return cb(err)
    cb(null, res)
  }.bind(this))
}
