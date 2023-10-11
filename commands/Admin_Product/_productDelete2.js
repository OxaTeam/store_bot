/*CMD
  command: /productDelete2
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

Bot.setProperty("Product" + params, null, "json", "Products")
sendMessage(`✅ The product has been deleted successfully.`)
