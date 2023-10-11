/*CMD
  command: /configSalesPartner
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 🎁 sales partner configuration
  group: Admins
CMD*/

let lastPayoutApiKey = Bot.getProperty("oxapaylibpayoutapikey")
if (!lastPayoutApiKey) {
  return Bot.run({ command: "/setPayoutApiKeyStep1" })
}

let buttons = [
  [
    {
      text: "⚙️ Change payout API key",
      callback_data: "/setPayoutApiKeyStep1"
    }
  ],
  [
    {
      text: "🎁 Change commission",
      callback_data: "/setCommissionStep1"
    }
  ]
]
let text = `🎁 *What is a Sales Partner?*

Enabling this feature allows anyone to share your products through their channels, bots, or with their friends, helping you increase sales. Your sales partners will receive a commission that you can customize.`
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
