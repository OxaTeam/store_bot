/*CMD
  command: /salesHistory
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 🛒 sales history
  group: Admins
CMD*/

var buttons = [
  [
    { text: "Last 7 days", callback_data: "/salesStat 7d" },
    { text: "Last 30 days", callback_data: "/salesStat 30d" },
    { text: "All", callback_data: "/salesStat all" }
  ]
]

let text = "🗓 Select the Desired History Duration"
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
