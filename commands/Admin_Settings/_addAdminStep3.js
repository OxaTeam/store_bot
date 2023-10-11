/*CMD
  command: /addAdminStep3
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options) return
User.addToGroup("Admins")

let list = new List({ name: "Admins" })
if (!list.exist) list.create()
Bot.setProperty({
  name: "Admin" + user.telegramid,
  value: { notif: true, username: user.username },
  type: "json",
  list: "Admins"
})
