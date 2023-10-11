/*CMD
  command: /productDesc
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
let res = checkAnswer("text", skip)
if (res == "exit") return
else if (res == "invalid") Bot.runCommand("/productDesc")
else if (res == "next") {
  if (message != "/skip") {
    let product = User.getProperty("crrProduct")
    product.desc = message
    User.setProperty("crrProduct", product, "json")
  }
  let text =
    '💰*Product Price*: Specify the product price. For example: "10 USD."'
  if (skip)
    text = `💰*Product Price*: Specify the new product price. For example: "10 USD." If you don't wish to edit the price, You can /skip this step.`
  sendMessage(text)
  Bot.runCommand("/productPrice")
}
