/*CMD
  command: /withdrawStep2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options) return
let res = checkAnswer("OXAAddress")
if (res == "exit") return
else if (res == "invalid") Bot.run({ command: "/withdrawStep2", options })
else if (res == "next") {
  let balance = Libs.ResourcesLib.userRes(options.currency)
  if (balance.value() > 0) {
    let amount = balance.value()
    balance.remove(amount)
    let fields = {
      url: "api/send",
      fields: {
        amount: amount,
        currency: options.currency,
        address: message,
        onCallback: "/onCallbackPayout " + amount + " " + options.currency
      },
      onSuccess: "/onCreatePayout " + amount + " " + options.currency
    }
    Libs.OxaPayLib.apiCall(fields)
  }
}
