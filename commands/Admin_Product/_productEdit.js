/*CMD
  command: /productEdit
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!params) return

let product = Bot.getProperty("Product" + params)
if (!product) return sendMessage("There isn’t the product!")

User.setProperty("crrProduct", product, "json")

let text = "✏️ *Product Title*: Please enter a new title for your product. If you don't wish to edit the title, You can /skip this step."
sendMessage(text)
Bot.runCommand("/productTitle")
