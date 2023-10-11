/*CMD
  command: /productTypeUnlimit
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

sendMessage("📁 *Product File*: Attach the product file. This file will be sent to users when they purchase the product.")
let product = User.getProperty("crrProduct")
product.type = "unlimit"
User.setProperty("crrProduct", product, "json")
Bot.runCommand("/getProductFile")
