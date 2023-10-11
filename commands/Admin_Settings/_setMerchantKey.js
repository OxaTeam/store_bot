/*CMD
  command: /setMerchantKey
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
else if (res == "invalid") return Bot.runCommand("/setMerchantKey")
else if (res == "next") {
  if (message.toLowerCase() == "sandbox") message = "sandbox"
  let lastMerchantKey = Bot.getProperty("oxapaylibmerchantkey")
  Libs.OxaPayLib.setMerchantKey(message)
  Libs.OxaPayLib.apiCall({
    url: "merchants/allowedCoins",
    onSuccess: "/onAllowedCoins"
  })
  if (!lastMerchantKey) Bot.run({ command: "/start" })
  else
    sendMessage("✅ The merchant API key has been edited successfully.")
}
