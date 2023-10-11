/*CMD
  command: /setPayoutApiKeyStep1
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: ⚙️ change payout api key
  group: Admins
CMD*/

let lastPayoutApiKey = Bot.getProperty("oxapaylibpayoutapikey")
let text = ""
if (!lastPayoutApiKey) {
  text = `⚙️ To configure the sales partner feature of the bot, please send your *OxaPay Payout API key*.

How to create payout API key

🎁 *What is a Sales Partner?*

Enabling this feature allows anyone to share your products through their channels, bots, or with their friends, helping you increase sales. Your sales partners will receive a commission that you can customize.`
} else {
  text = `ℹ️ To change the payout API key, just enough to send the new one.

🔑 *Current active payout API key*:
${lastPayoutApiKey}`
}
sendMessage(text)
Bot.run({ command: "/setPayoutApiKeyStep2" })
