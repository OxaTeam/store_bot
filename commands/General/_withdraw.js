/*CMD
  command: /withdraw
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 💳 withdraw
  group: 
CMD*/

let text = `🪙 Choose the asset you want to withdraw`
let buttons = []

let allowedCoins = Bot.getProperty("allowedCoins")
let currencies = Bot.getProperty("currencies")
for (let i = 0; i < allowedCoins.length; i++) {
  let balance = Libs.ResourcesLib.userRes(allowedCoins[i])
  if (balance.value() > 0)
    buttons.push([
      {
        text: `${currencies[allowedCoins[i]].name} | ${numberWithCommas(
          balance.value(),
          8
        )} ${allowedCoins[i]}`,
        callback_data: "/withdrawStep1 " + allowedCoins[i]
      }
    ])
}
if (buttons.length > 0) {
  sendMessage({
    text: text,
    reply_markup: {
      inline_keyboard: buttons
    }
  })
} else sendMessage("📂 There are no balance to withdraw")
