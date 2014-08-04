# peanuts

A small module to query multiple wallets for their balance

## Connector: blockr.io

### peanuts.blockr (type, wallets, opts, cb)

 - type `String`: currently ltc, btc, dgc, mec, ppc, qrk or tbtc
 - wallets `Array`: an array of wallet adresses
 - opts `Object`:
  - url `String`: the api url
 - cb (err, res) `Function`:  will return an array with the balance of each wallet
