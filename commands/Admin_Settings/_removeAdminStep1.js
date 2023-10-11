/*CMD
  command: /removeAdminStep1
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
Bot.run({command:"/removeAdminStep2", user_telegramid: params})
Bot.run({command:"/settings"})
