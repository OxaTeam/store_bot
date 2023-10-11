/*CMD
  command: /completeAddAdmin
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

sendMessage("✅ The new admins have been added successfully.")
Bot.run({ command: "/settings" })
