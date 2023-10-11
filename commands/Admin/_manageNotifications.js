/*CMD
  command: /manageNotifications
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 🔔 manage notifications
  group: Admins
CMD*/

let buttons = []
let admin = Bot.getProperty("Admin" + user.telegramid)
if (!admin)
  return sendMessage("Admin not found!")
if (params && params != "Manage notifications") {
  admin.notif = params == "true"
  Bot.setProperty({
    name: "Admin" + user.telegramid,
    value: admin,
    type: "json",
    list: "Admins"
  })
}

if (admin.notif)
  buttons.push([{
    text: "🔕 Mute notifications",
    callback_data: "/manageNotifications false"
  }])
else
  buttons.push([{
    text: "🔔 Unmute notifications",
    callback_data: "/manageNotifications true"
  }])

let text = "You can click to mute or unmute the bot notification"
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
