/*CMD
  command: /removeAdminList
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let list = new List({ name: "Admins" })
if (!list.exist) list.create()
let admins = list.get()
let buttons = []
for (let i = 0; i < admins.length; i++) {
  if (admins[i].name.replace("Admin", "") == user.telegramid) continue
  buttons.push([
    {
      text: admins[i].value["username"],
      callback_data: "/removeAdmin " + admins[i].name.replace("Admin", "")
    }
  ])
}
buttons.push([
  {
    text: "⬅️ Back",
    callback_data: "/settings"
  }
])
sendMessage({
  text: buttons.length > 1 ? "Choose the admin you want to remove" : "📂 There is no admin to remove",
  reply_markup: { inline_keyboard: buttons }
})
