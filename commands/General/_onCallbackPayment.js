/*CMD
  command: /onCallbackPayment
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options) return 

if (options.status == "Expired") {
  User.setProperty(options.orderId, null, "json", "Orders" )
  return
}
let order = User.getProperty(options.orderId)
order.status = options.status
if (options.status != "Paid") {
  User.setProperty({
    name: options.orderId,
    value: order,
    type: "json",
    list: "Orders"
  })
  return
}
let product = Bot.getProperty("Product" + order.productId)
order.file_id = product.type == "limit" ? product.files.shift() : product.files[0]

User.setProperty({
  name: options.orderId,
  value: order,
  type: "json",
  list: "Orders"
})

sendMessage("🎉", false)
sendMessage({
  document: order.file_id,
  caption:
    "✅ *Congratulations!*\n\nYou have successfully completed your purchase of the product."
}, false)
product.saleCount = (product.saleCount || 0) + 1
Bot.setProperty({
  name: "Product" + order.productId,
  value: product,
  type: "json",
  list: "Products"
})

let commission = Bot.getProperty("commission") || 0
if (commission > 0 && product.commission) commission = product.commission

let saleList = new List({ name: "Sales" })
if (!saleList.exist) saleList.create()

let sale = {
  productId: product.id,
  orderId: order.id,
  price: options.price || 0,
  commission: (options.price * commission) / 100
}
Bot.setProperty({
  name: "Sale-" + options.trackId,
  value: sale,
  type: "json",
  list: "Sales"
})

let commissionAmount = 0
if (order.partnerId && commission > 0) {
  commissionAmount = Math.floor((options.payAmount * commission / 100) * Math.pow(10, 8)) / Math.pow(10, 8)
  let res = Libs.ResourcesLib.anotherUserRes(options.payCurrency, order.partnerId)
  res.add(commissionAmount)
  let res2 = Libs.ResourcesLib.anotherUserRes(options.payCurrency + "PartnerEarning", order.partnerId)
  res2.add(commissionAmount)
  sendMessage({
    chat_id: order.partnerId,
    text: `🔔 *Sales partner commission*

🛍️ *Product*: ${product.title}
💰 *Paid Amount*: ${amountFormat(options.payAmount, options.payCurrency)} ($${options.price})
🎁 *Sales partner commission*: ${amountFormat(commissionAmount, options.payCurrency)} ($${numberWithCommas(sale.commission)})`
  })
}

let list = new List({ name: "Admins" })
if (!list.exist) list.create()
let admins = list.get()
let text = `🔔 *A New Sale*

🛍️ *Product*: ${product.title}
💰 *Paid Amount*: ${amountFormat(options.payAmount, options.payCurrency)} ($${options.price})
🎁 *Sales partner commission*: ${amountFormat(commissionAmount, options.payCurrency)} ($${numberWithCommas(sale.commission)})
------------------------------------
✅ *Status*: Confirmed
${options.txID ? "🆔 [TX-ID](" + options.txID + ")" : ""}`
for (let i = 0; i < admins.length; i++) {
  if (admins[i].value["notif"] == false) continue
  sendMessage({chat_id: admins[i].name.replace("Admin", ""), text: text})
  if (product.files.length == 0)
    sendMessage({
      chat_id: admins[i].name.replace("Admin", ""),
      text: `🪫 Your ${product.title} product’s balance has been depleted. If needed, you can recharge it.`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "➕ Recharge Now",
              callback_data: "/productRecharge " + product.id
            }
          ]
        ]
      }
    })
}
