/*CMD
  command: /productPrice
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let product = User.getProperty("crrProduct")
let skip = product?.id > 0
let res = checkAnswer("price", skip)
if (res == "exit") return
else if (res == "invalid") Bot.runCommand("/productPrice")
else if (res == "next") {
  if (message != "/skip") {
    let amount = message.match(/\d+/)[0]
    let currency = message.replace(/\$|\d|\s/g, "").toUpperCase()
    let product = User.getProperty("crrProduct")
    product.amount = amount
    product.currency = currency
    User.setProperty("crrProduct", product, "json")
  }
  if (Bot.getProperty("commission")) {
    let text = `🎁 *Sales Partner Commission*: Define a commission for your sales partners, ranging from 0 to 99.

ℹ️ If you /skip this step, the default commission will be set for this product.`
    if (product.id > 0)
      text = `🎁 *Sales Partner Commission*: Define a new commission for your sales partners, ranging from 0 to 99.

ℹ️ If you need no change, /skip this step`
    sendMessage(text)
    Bot.run({ command: "/productCommission" })
  } else {
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
}
