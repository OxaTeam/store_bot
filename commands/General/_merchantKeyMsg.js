/*CMD
  command: /merchantKeyMsg
  help: 
  need_reply: false
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🔑 change merchant api key
  group: 
CMD*/

let merchantKey = Bot.getProperty("oxapaylibmerchantkey")
if (merchantKey) {
  let text =
    "ℹ️ To change the merchant API key, just enough to send the new one.\n\n🔑 *Current active merchant API key*:\n" +
    merchantKey
  sendMessage(text)
}
Bot.runCommand("/setMerchantKey")
