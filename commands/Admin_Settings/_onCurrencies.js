/*CMD
  command: /onCurrencies
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!options) { return }

Bot.setProperty("currencies", options.data, "json")
