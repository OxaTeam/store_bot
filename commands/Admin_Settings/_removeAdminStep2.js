/*CMD
  command: /removeAdminStep2
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (request) return
User.removeGroup()
Bot.setProperty({
  name: "Admin" + user.telegramid,
  value: null,
  list: "Admins"
})

sendMessage('✅ The admin has been removed successfully.')
