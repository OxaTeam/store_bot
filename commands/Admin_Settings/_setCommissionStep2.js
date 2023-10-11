/*CMD
  command: /setCommissionStep2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let res = checkAnswer("number")
if (res == "exit") return
else if (res == "invalid") return Bot.runCommand("/setCommissionStep2")
else if (res == "next") {
  if (message < 0 || message > 99) {
    sendMessage("⚠️ Please just send me number between 0 to 99!")
    return Bot.runCommand("/setCommissionStep2")
  }
  Bot.setProperty("commission", message)
  Bot.run({ command: "/configSalesPartnerComplete" })
}
