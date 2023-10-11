/*CMD
  command: /onAllowedCoins
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (options.result == 100){
  Bot.setProperty("allowedCoins", options.allowed, "json")
}
