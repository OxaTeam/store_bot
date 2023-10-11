/*CMD
  command: /productTypeLimit
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

sendMessage("📁 *Product File*: Send each limit product as separate files and then send /complete commad. Each purchase will include one of these files.")
let product = User.getProperty("crrProduct")
product.type = "limit"
User.setProperty("crrProduct", product, "json")
Bot.runCommand("/getProductFile")
