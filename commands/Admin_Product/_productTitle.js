/*CMD
  command: /productTitle
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
else if (res == "invalid") Bot.runCommand("/productTitle")
else if (res == "next") {
  if (message != "/skip") {
    product.title = message
    User.setProperty("crrProduct", product, "json")
  }
  let text = "🏞*Product Representation*: Send a presentation file, image, video, or GIF for your product. If there's no representation file, you can /skip this step."
  if (skip)
    text = "🏞*Product Representation*: Send a new presentation file, image, video, or GIF for your product. If you don't wish to edit the presentation file, You can /skip this step."
  sendMessage(text)
  Bot.runCommand("/productImage")
}
