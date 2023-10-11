/*CMD
  command: /productDelete
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

var buttons = [
  [
    { text: "❌ No, Cancel", callback_data: "/productDetail " + params },
    { text: "🗑 Yes, Delete", callback_data: "/productDelete2 " + params }
  ]
]
let text = "Are You Sure You Want to *Delete This Product*?";
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
