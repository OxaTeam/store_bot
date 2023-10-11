/*CMD
  command: /removeAdmin
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!params) return

let admin = Bot.getProperty("Admin" + params)
if (!admin) return sendMessage("There isn’t the admin!")

var buttons = [
  [
    { text: "❌ No, Cancel", callback_data: "/removeAdminList" },
    { text: "🗑 Yes, Remove", callback_data: "/removeAdminStep1 " + params }
  ]
]
let text = "Are You Sure You Want to *remove this admin*?"
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
