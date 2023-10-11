/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: ⬅️ back to main menu
  group: 
CMD*/

let buttons = [["💰Balance","🛍 Products"],["📊 Statistics","💳 Withdraw"]]
if (Bot.getProperty("commission") > 0) buttons.push(["🎁 Sales Partner"])
if (User.getGroup() == "Admins") buttons.push(["👨‍💻 Admin"])
if (params && params != "Back To Main Menu") {
  if (!User.getProperty("message_id")){
    sendMessage({text: "👇What would you like to do?👇",reply_markup: { keyboard: buttons, resize_keyboard: true }}, false)
  let input = params.split("Product")
  let product = Bot.getProperty("Product" + input[1])
  if (!product) return sendMessage("There isn’t the product!")
  }
  return Bot.runCommand("/productPay " + params)
} else if (!Bot.getProperty("oxapaylibmerchantkey")) {
  Bot.run({ command: "/addAdminStep3", options: true })
  sendMessage("🔑 To set up this bot, you need an OxaPay merchant API key\n\nIf you don’t have, sign up in OxaPay and create one!\n\n🌏 [OxaPay.com](https://oxapay.com)\n\n[How to create merchant API key](https://docs.google.com/integrations/merchant-api)")
  Bot.run({ command: "/setMerchantKey" })
} else {
  if (User.getProperty("message_id")){
    Api.deleteMessage({
      message_id: User.getProperty("message_id")
    })
    User.setProperty("message_id", null)
  }
  sendMessage({text: "👇What would you like to do?👇", reply_markup: { keyboard: buttons, resize_keyboard: true }}, false)
}
