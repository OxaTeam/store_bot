/*CMD
  command: /addAdminStep2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!message) return
if (isNaN(message)) {
  sendMessage("⚠️ Please just send me a valid ID!")
  Bot.run({ command: "/addAdminStep2" })
} else {
  Bot.run({ user_telegramid: message, command: "/addAdminStep3", options: true })
  Bot.run({ command: "/addAdminStep2" })
  sendMessage("If you wish to add more admin, provide the admin's Telegram ID. Otherwise, send /completeAddAdmin to finish the process.")
}
