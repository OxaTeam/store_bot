/*CMD
  command: /purchasedOrders
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🗄 purchased orders
  group: 
CMD*/

let page = params || 1
let list = new List({ name: "Orders", user_id: user.id })
if (!list.exist) list.create()
let orders = list.get()
if (orders.length == 0) return sendMessage("📂 There are no orders on record.")
let buttons = []
for (let i = orders.length - 1; i >= 0; i--) {
  let product = Bot.getProperty("Product" + orders[i].value.productId)
  if (!product) continue
  if (orders[i].value.status != "Paid") continue
  buttons.push([{
    text: product.title,
    callback_data: "/orderDetail " + orders[i].name
  }])
}

if (buttons.length == 0) return sendMessage("📂 There are no orders on record.")
else if (buttons.length > page * 10) {
  buttons = buttons.slice((page - 1) * 10, page * 10)
  buttons.push([{
    text: 'More',
    callback_data: "/purchasedOrders " + (page + 1)
  }])
}
sendMessage({
  text: "🛒 Your List of Purchased Orders",
  reply_markup: { inline_keyboard: buttons }
})
