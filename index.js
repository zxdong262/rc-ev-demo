const engagevoice = require('engagevoice-sdk-wrapper')

const {
  RINGCENTRAL_CLIENTID,
  RINGCENTRAL_CLIENTSECRET,
  RINGCENTRAL_USERNAME,
  RINGCENTRAL_PASSWORD,
  RINGCENTRAL_EXTENSION = ''
} = process.env

var ev = new engagevoice.RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET)
ev.login(RINGCENTRAL_USERNAME, RINGCENTRAL_PASSWORD, RINGCENTRAL_EXTENSION, function (err, response) {
  if (err)
    console.log(err)
  else {
    var jsonObj = JSON.parse(response)
    list_account_active_calls(jsonObj.agentDetails[0].accountId)
  }
})

function list_account_active_calls(accountId) {
  var endpoint = 'admin/accounts/~/activeCalls/list'
  var params = {
    product: "ACCOUNT",
    productId: accountId
  }
  ev.get(endpoint, params, function (err, response) {
    if (err) {
      console.log(err)
    } else {
      var jsonObj = JSON.parse(response)
      console.log(jsonObj)
    }
  })
}
