/*CMD
  command: /salesPartnerEarning
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🎁 sales partner earning
  group: 
CMD*/

let allowedCoins = Bot.getProperty("allowedCoins")
let currencies = Bot.getProperty("currencies")
let text = `🎁 *Your total sales partner earning history*\n\n`
let findHistory = false
for (let i = 0; i < allowedCoins.length; i++) {
  let errning = Libs.ResourcesLib.userRes(allowedCoins[i] + "PartnerEarning")
  if (errning.value() > 0) {
    text += `${currencies[allowedCoins[i]].name}: ${numberWithCommas(errning.value(), 8)} ${allowedCoins[i]}\n`
    findHistory = true
  }
}
if (!findHistory) text = "📂 No Sales Partner history found!"
sendMessage(text)
