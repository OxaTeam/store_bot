/*CMD
  command: /addProduct
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: ➕add new product
  group: Admins
CMD*/

let text = "✏️ *Product Title*: Please provide a title for your product."
User.setProperty("crrProduct", { title: "" }, "json")

sendMessage(text)
Bot.runCommand("/productTitle")
