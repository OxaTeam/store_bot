/*CMD
  command: /productCommission
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let res = checkAnswer("number", true)
if (res == "exit") return
else if (res == "invalid") Bot.runCommand("/productCommission")
else if (res == "next") {
  let product = User.getProperty("crrProduct")
  if (message != "/skip") {
    product.commission = message
    User.setProperty("crrProduct", product, "json")
  }
  if (product.id > 0) {
    Bot.run({ command: "/complete" })
  } else {
    var buttons = [
      [
        { text: "Limit", callback_data: "/productTypeLimit" },
        { text: "Unlimit", callback_data: "/productTypeUnlimit" }
      ]
    ]
    let text = "*Product Type*: Choose the product type:\n\n*Limit*: For products with a limited count, such as gift cards.\n*Unlimit*: For products like tutorials."
    sendMessage({
      text: text,
      reply_markup: { inline_keyboard: buttons }
    })
  }
}
