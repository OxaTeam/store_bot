/*CMD
  command: /setCommissionStep1
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 🎁 change commission
  group: Admins
CMD*/

let commission = Bot.getProperty("commission")
let text = ""
if (!commission) {
  text = `🎁 Now, kindly share a number between 0 and 99 as your *default sales partner commission*. You can always customize this commission for each product individually.`
} else {
  text = `ℹ️ To change the sales partner commission, just enough to send a number between 0 to 99 as new commission.

🎁 *Current commission*: ${commission}%`
}
sendMessage(text)
Bot.run({ command: "/setCommissionStep2" })
