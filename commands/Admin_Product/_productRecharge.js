/*CMD
  command: /productRecharge
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
if (!product) return sendMessage("📂 There are no products on record.")
if (product.type != "limit")
  return sendMessage("⚠️ This product isn’t rechargeable")

User.setProperty("crrProduct", product, "json")
User.setProperty("productRecharge", true)

let text = "📁 *Product File*: Send each limit product as separate files and then send /complete commad. Each purchase will include one of these files."
sendMessage(text)
Bot.runCommand("/getProductFile")
