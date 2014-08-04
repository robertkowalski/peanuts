var Lab = require("lab"),
    describe = Lab.experiment,
    before = Lab.before,
    it = Lab.test,
    assert = require("assert"),
    p = require("../index.js"),
    hock = require('hock')

var mockApi = "http://localhost:1337/"

describe("blockr", function () {
  it("should throw in case no array is provided", function (done) {
    assert.throws(function () {
      p.blockr('ltc', null, {}, function () {})
    })
    done()
  })

  it("should throw in case no cb is provided", function (done) {
    assert.throws(function () {
      p.blockr('ltc', [1, 2], {}, null)
    })
    done()
  })

  it("should throw in case no options are provided", function (done) {
    assert.throws(function () {
      p.blockr('ltc', [1, 2], "ente", function () {})
    })
    done()
  })

  it("should return an error in case no valid response was given", function (done) {
    createMockServer("/1,2,3", "http error", function (er, s) {
      p.blockr('ltc', [1, 2, 3], {url: mockApi}, function (err, data) {
        assert.ok(err)
        s.close()
        done()
      })
    })
  })

  it("should return an array with the amount of ltc", function (done) {
    var res = {
      "status": "success",
      "data": [
        {
          "address": "1",
          "is_unknown": false,
          "balance": 1337,
          "is_valid": true
        },
        {
          "address": "2",
          "is_unknown": false,
          "balance": 23,
          "is_valid": true
        },
        {
          "address": "3",
          "is_unknown": false,
          "balance": 42,
          "is_valid": true
        },

      ],
      "code": 200,
      "message": ""
    }
    createMockServer("/1,2,3", res, function (er, s) {
      p.blockr('ltc', [1, 2, 3], {url: mockApi}, function (err, data) {
        assert.deepEqual(data, [1337, 23, 42])
        s.close()
        done()
      })
    })
  })
})

function createMockServer (url, res, cb) {
  hock.createHock(1337, function (err, hockServer) {
    hockServer
        .get(url)
        .reply(200, res)
    cb(null, hockServer)
  })
}
