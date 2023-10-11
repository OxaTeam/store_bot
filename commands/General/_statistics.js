/*CMD
  command: /statistics
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 📊 statistics
  group: 
CMD*/

let text = `Choose what would you like to check?`
sendMessage({
  text: text,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🗃️ Purchased orders",
          callback_data: "/purchasedOrders"
        }
      ],
      [
        {
          text: "🎁 Sales partner earning",
          callback_data: "/salesPartnerEarning"
        }
      ]
    ]
  }
})
