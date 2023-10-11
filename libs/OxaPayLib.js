// Declare variables for the library prefix and the API URL
let libPrefix = "oxapaylib";
let API_URL = "https://api.oxapay.com/";

// Functions to set and get the merchant key 
function setMerchantKey(key) {
  Bot.setProperty(libPrefix + "merchantkey", key, "string");
}

function getMerchantKey() {
  var merchantKey = Bot.getProperty(libPrefix + "merchantkey");
  if (!merchantKey) { throw new Error("OxaPay lib: no merchantKey. You need to setup it") }

  return merchantKey
}

// Functions to set and get the payout api key 
function setPayoutApiKey(key) {
  Bot.setProperty(libPrefix + "payoutapikey", key, "string");
}

function getPayoutApiKey() {
  var payoutApiKey = Bot.getProperty(libPrefix + "payoutapikey");
  if (!payoutApiKey) { throw new Error("OxaPay lib: no payoutApiKey. You need to setup it") }

  return payoutApiKey
}

// Function to make an API call
function apiCall(options) {
  if (!options) { throw "OxaPayLib: apiCall need options" }
  if (!options.url) { throw "OxaPayLib: apiCall need options.url" }
  if (!options.fields) options.fields = {}

  if (options.url.includes("merchants/") && !options.fields.merchant) {
    // Get the merchant key from the "getMerchantKey" function and add it to the options object
    options.fields.merchant = getMerchantKey()
  }
  else if (options.url.includes("api/") && !options.fields.key) {
    // Get the Payout Api key from the "getPayoutApiKey" function and add it to the options object
    options.fields.key = getPayoutApiKey();
  }

  if (options.fields.onCallback && !options.fields.callbackUrl) {
    // Define the callback URL for payments
    options.fields.callbackUrl = Libs.Webhooks.getUrlFor({
      command: libPrefix + "onCallback " + options.fields.onCallback,
      user_id: user.id,
    })
  }

  // Set the headers for the API request
  let headers = {
    "cache-control": "no-cache",
    "Content-type": "application/json",
    "Accept": "application/json",
  }

  // Define parameters for the HTTP request
  params = {
    url: API_URL + options.url,
    body: options.fields,
    headers: headers,

    // Set success and error callback functions for the API call
    success: libPrefix + "onApiResponse " + options.onSuccess,
    error: libPrefix + "onApiResponseError"
  }

  HTTP.post(params)
}

// Function called when an API response is received
function onApiResponse() {

  // Parse the content of the response, which is in JSON format
  let json = JSON.parse(content);

  // Execute the request onSuccess command and pass "options" objects as arguments
  Bot.runCommand(params, json);
}

// Function called when an API request results in an error
function onApiResponseError() {
  throw content
}

// Function called when a transaction status is updated
function onCallback(e) {
  // Parse the JSON data contained in the callback content
  let data = JSON.parse(content);
  const apiSecretKey = (data.type === "payment") ? getMerchantKey() : getPayoutApiKey();
  const hmacHeader = options.headers.Hmac;
  const calculatedHmac = CryptoJS.HmacSHA512(content, apiSecretKey).toString(CryptoJS.enc.Hex);

  if (calculatedHmac === hmacHeader) {
    Bot.run({ command: params, options: data })
    return "OK"
  }
  return "Invalid HMAC signature"
}

// Export functions to be used elsewhere
publish({

  // These lines of code are defining properties for an object, named "setMerchantKey" and "setPayoutApiKey" respectively.
  // These two functions set some sort of API key for a payment processing system.
  // These functions should only be called by admin

  setMerchantKey: setMerchantKey,

  setPayoutApiKey: setPayoutApiKey,

  // This function can call all api
  // It is not clear what this nested "apiCall" object or function does based on this code alone.
  apiCall: apiCall,
})

// Set up event listeners for various events
on(libPrefix + "onApiResponse", onApiResponse);
on(libPrefix + "onApiResponseError", onApiResponseError);
on(libPrefix + "onCallback", onCallback);