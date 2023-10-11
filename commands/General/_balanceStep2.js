/*CMD
  command: /balanceStep2
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options) return

let allowedCoins = Bot.getProperty("allowedCoins")
let currencies = Bot.getProperty("currencies")
let totalBalance = 0
let text = ''
for (let i = 0; i < allowedCoins.length; i++){
  let balance = Libs.ResourcesLib.userRes(allowedCoins[i])
  if (balance.value() > 0) {
    totalBalance += (balance.value() * options.data[allowedCoins[i]])
    text += `${currencies[allowedCoins[i]].name}: ${numberWithCommas(balance.value(), 8)} ${allowedCoins[i]}\n`
  }
}
text = `💰 *Your total balance*: $${numberWithCommas(totalBalance, 2)}\n\n` + text
sendMessage({
  text: text,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💳 Withdraw",
          callback_data: "/withdraw"
        }
      ]
    ]
  }
})
