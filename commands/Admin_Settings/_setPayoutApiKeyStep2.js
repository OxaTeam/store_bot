/*CMD
  command: /setPayoutApiKeyStep2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let res = checkAnswer("apiKey")
if (res == "exit") return
else if (res == "invalid") return Bot.runCommand("/setPayoutApiKeyStep2")
else if (res == "next") {
  let lastPayoutApiKey = Bot.getProperty("oxapaylibpayoutapikey")
  Libs.OxaPayLib.setPayoutApiKey(message)
  Bot.run({command: "/updateCurrencies"})
  if (!lastPayoutApiKey) 
    Bot.run({ command: "/setCommissionStep1" })
  else
    Bot.run({ command: "/configSalesPartnerComplete" })
}
